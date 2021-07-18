const Board = require('./index.model');
const Task = require('../tasks/index.model');
const purify = require('../../../helpers/purify');
const { validateBoard } = require('./index.schema');
const { responseWithError } = require('../../../helpers/errors');
const { validateDbId } = require('../../../helpers/schemas');
const { boardIdMessages } = require('../../../helpers/validation/messages/boardID');

const getBoard = async (req, res, next) => {
  const { id: user_id = '' } = req.user || {};
  const { id: _id = '' } = req.params || {};

  const { validationError: boardIdError } = validateDbId(_id, boardIdMessages);

  if (boardIdError) {
    return responseWithError(res, next, 409, boardIdError.details[0].message);
  }

  try {
    const board = await Board.findOne({ _id, deleted_at: null });

    if (!board) {
      return responseWithError(res, next, 404, 'Tablica nie istnieje.');
    }

    if (board.user_id.toString() !== user_id) {
      return responseWithError(res, next, 403, 'Brak dostępu.');
    }

    return res.status(200).json(board);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const getBoards = async (req, res, next) => {
  const { id: user_id = '' } = req.user || {};

  try {
    const boards = await Board.find({ user_id, deleted_at: null }).sort({
      created_at: -1,
    });

    if (!boards.length) {
      return responseWithError(res, next, 404, 'Brak tablic.');
    }

    return res.status(200).json(boards);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const createBoard = async (req, res, next) => {
  const { id: user_id = '' } = req.user || {};

  const { validationError, data } = validateBoard({
    ...req.body,
    user_id,
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

  try {
    const board = {
      ...data,
      purify_title,
      purify_description,
      tasks_count: 0,
      deleted_at: null,
    };

    const createdBoard = await Board.create(board);

    if (!createdBoard) {
      return responseWithError(
        res,
        next,
        409,
        'Nie udało się utworzyć tablicy.',
      );
    }

    return res.status(200).json(createdBoard);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const updateBoard = async (req, res, next) => {
  const { id: user_id = '' } = req.user || {};
  const { id: _id = '' } = req.params || {};

  const { validationError: boardIdError } = validateDbId(_id, boardIdMessages);

  if (boardIdError) {
    return responseWithError(res, next, 409, boardIdError.details[0].message);
  }

  try {
    const board = await Board.findOne({ _id, deleted_at: null });

    if (!board) {
      return responseWithError(res, next, 404, 'Tablica nie istnieje.');
    }

    if (board.user_id.toString() !== user_id) {
      return responseWithError(res, next, 403, 'Brak dostępu.');
    }

    const { validationError, data } = validateBoard({
      ...req.body,
      user_id: board.user_id.toString(),
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

    const updatedBoard = await Board.findByIdAndUpdate(
      _id,
      {
        ...data,
        purify_title,
        purify_description,
      },
      { new: true },
    );

    if (!updatedBoard) {
      return responseWithError(
        res,
        next,
        409,
        'Nie udało się zaktualizować tablicy.',
      );
    }

    return res.status(200).json(updatedBoard);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const deleteBoard = async (req, res, next) => {
  const { id: user_id = '' } = req.user || {};
  const { id: _id = '' } = req.params || {};

  const { validationError: boardIdError } = validateDbId(_id, boardIdMessages);

  if (boardIdError) {
    return responseWithError(res, next, 409, boardIdError.details[0].message);
  }

  try {
    const board = await Board.findOne({ _id, deleted_at: null });

    if (!board) {
      return responseWithError(res, next, 404, 'Tablica nie istnieje.');
    }

    if (board.user_id.toString() !== user_id) {
      return responseWithError(res, next, 403, 'Brak dostępu.');
    }

    const deletedTasks = await Task.updateMany(
      { board_id: _id },
      { deleted_at: Date.now() },
    );

    if (!deletedTasks) {
      return responseWithError(res, next, 409, 'Nie udało się usunąć zadań z tablicy.');
    }

    const deletedBoard = await Board.findByIdAndUpdate(
      _id,
      { deleted_at: Date.now() },
      { new: true },
    );

    if (!deletedBoard && !deletedBoard.deleted_at) {
      return responseWithError(res, next, 409, 'Nie udało się usunąć tablicy.');
    }

    return res.status(200).json(deletedBoard);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

module.exports = {
  getBoard,
  getBoards,
  createBoard,
  updateBoard,
  deleteBoard,
};
