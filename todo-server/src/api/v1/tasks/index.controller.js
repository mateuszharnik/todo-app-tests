const Task = require('./index.model');
const Board = require('../boards/index.model');
const purify = require('../../../helpers/purify');
const { validateTask } = require('./index.schema');
const { responseWithError } = require('../../../helpers/errors');
const { validateDbId } = require('../../../helpers/schemas');
const { boardIdMessages } = require('../../../helpers/validation/messages/boardID');
const { taskIdMessages } = require('../../../helpers/validation/messages/taskID');

const getTask = async (req, res, next) => {
  const { id: user_id = '' } = req.user || {};
  const { id: _id = '' } = req.params || {};

  const { validationError: taskIdError } = validateDbId(_id, taskIdMessages);

  if (taskIdError) {
    return responseWithError(res, next, 409, taskIdError.details[0].message);
  }

  try {
    const task = await Task.findOne({ _id, deleted_at: null });

    if (!task) {
      return responseWithError(res, next, 404, 'Zadanie nie istnieje.');
    }

    if (task.user_id.toString() !== user_id) {
      return responseWithError(res, next, 403, 'Brak dostępu.');
    }

    return res.status(200).json(task);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const getTasks = async (req, res, next) => {
  const { id: user_id = '' } = req.user || {};
  const { board_id = '' } = req.query || {};

  const query = {
    user_id,
    deleted_at: null,
  };

  if (board_id) {
    const { validationError: boardIdError } = validateDbId(
      board_id,
      boardIdMessages,
    );

    if (boardIdError) {
      return responseWithError(
        res,
        next,
        409,
        boardIdError.details[0].message,
      );
    }

    query.board_id = board_id;
  }

  try {
    const tasks = await Task.find(query).sort({ created_at: -1 });

    if (!tasks.length) {
      return responseWithError(res, next, 404, 'Brak zadań.');
    }

    return res.status(200).json(tasks);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const createTask = async (req, res, next) => {
  const { id: user_id = '' } = req.user || {};
  const { board_id = '' } = req.query || {};

  const { validationError: boardIdError } = validateDbId(board_id, boardIdMessages);

  if (boardIdError) {
    return responseWithError(
      res,
      next,
      409,
      boardIdError.details[0].message,
    );
  }

  try {
    const board = await Board.findOne({
      _id: board_id,
      user_id,
      deleted_at: null,
    });

    if (!board) {
      return responseWithError(res, next, 404, 'Tablica nie istnieje.');
    }

    const { validationError, data } = validateTask({
      ...req.body,
      user_id,
      board_id,
    });

    if (validationError) {
      return responseWithError(
        res,
        next,
        409,
        validationError.details[0].message,
      );
    }

    const purify_title = purify(data.title);
    const purify_description = purify(data.description);

    if (!purify_title) {
      return responseWithError(
        res,
        next,
        409,
        'Tytuł zawiera niebezpieczne znaki. Proszę podać inny tytuł.',
      );
    }

    if (!purify_description) {
      return responseWithError(
        res,
        next,
        409,
        'Opis zawiera niebezpieczne znaki. Proszę podać inny opis.',
      );
    }

    const task = {
      ...data,
      purify_title,
      purify_description,
      deleted_at: null,
    };

    const createdTask = await Task.create(task);

    if (!createdTask) {
      return responseWithError(
        res,
        next,
        409,
        'Nie udało się utworzyć zadania.',
      );
    }

    const tasks_count = await Task.count({ board_id, deleted_at: null });
    const updatedBoard = await Board.findByIdAndUpdate(
      board_id,
      { tasks_count },
    );

    if (!updatedBoard) {
      return responseWithError(res, next, 409, 'Nie udało się zaktualizować liczby zadań w tablicy.');
    }

    return res.status(200).json(createdTask);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const updateTask = async (req, res, next) => {
  const { id: user_id = '' } = req.user || {};
  const { id: _id = '' } = req.params || {};

  const { validationError: taskIdError } = validateDbId(_id, taskIdMessages);

  if (taskIdError) {
    return responseWithError(res, next, 409, taskIdError.details[0].message);
  }

  try {
    const task = await Task.findOne({ _id, deleted_at: null });

    if (!task) {
      return responseWithError(res, next, 404, 'Zadanie nie istnieje.');
    }

    if (task.user_id.toString() !== user_id) {
      return responseWithError(res, next, 403, 'Brak dostępu.');
    }

    const { validationError, data } = validateTask({
      ...req.body,
      user_id: task.user_id.toString(),
      board_id: task.board_id.toString(),
    });

    if (validationError) {
      return responseWithError(
        res,
        next,
        409,
        validationError.details[0].message,
      );
    }

    const purify_title = purify(data.title);
    const purify_description = purify(data.description);

    if (!purify_title) {
      return responseWithError(
        res,
        next,
        409,
        'Tytuł zawiera niebezpieczne znaki. Proszę podać inny tytuł.',
      );
    }

    if (!purify_description) {
      return responseWithError(
        res,
        next,
        409,
        'Opis zawiera niebezpieczne znaki. Proszę podać inny opis.',
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      {
        ...data,
        purify_title,
        purify_description,
      },
      { new: true },
    );

    if (!updatedTask) {
      return responseWithError(res, next, 409, 'Nie udało się zaktualizować zadania.');
    }

    return res.status(200).json(updatedTask);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const deleteTask = async (req, res, next) => {
  const { id: user_id = '' } = req.user || {};
  const { id: _id = '' } = req.params || {};

  const { validationError: taskIdError } = validateDbId(_id, taskIdMessages);

  if (taskIdError) {
    return responseWithError(res, next, 409, taskIdError.details[0].message);
  }

  try {
    const task = await Task.findOne({ _id, deleted_at: null });

    if (!task) {
      return responseWithError(res, next, 404, 'Zadanie nie istnieje.');
    }

    if (task.user_id.toString() !== user_id) {
      return responseWithError(res, next, 403, 'Brak dostępu.');
    }

    const deletedTask = await Task.findByIdAndUpdate(
      _id,
      { deleted_at: Date.now() },
      { new: true },
    );

    if (!deletedTask && !deletedTask.deleted_at) {
      return responseWithError(res, next, 409, 'Nie udało się usunąć zadania.');
    }

    const { board_id } = deletedTask;

    const tasks_count = await Task.count({ board_id, deleted_at: null });
    const updatedBoard = await Board.findByIdAndUpdate(board_id, {
      tasks_count,
    });

    if (!updatedBoard) {
      return responseWithError(
        res,
        next,
        409,
        'Nie udało się zaktualizować liczby zadań w tablicy.',
      );
    }

    return res.status(200).json(deletedTask);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

module.exports = {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
