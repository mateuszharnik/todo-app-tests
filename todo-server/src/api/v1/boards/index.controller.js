const Board = require('./index.model');
const { validateBoard } = require('./index.schema');
const { responseWithError } = require('../../../helpers/errors');

const getBoard = async (req, res, next) => {
  try {
    const board = await Board.findOne({ _id: req.params.id, deleted_at: null });

    if (!board) {
      return responseWithError(res, next, 404, 'Tablica nie istnieje.');
    }

    if (board.user_id.toString() !== req.user.id) {
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
  try {
    const boards = await Board
      .find({ user_id: req.user.id, deleted_at: null })
      .sort({ created_at: -1 });

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
  const { id = '' } = req.user || {};

  const { validationError, data } = validateBoard({
    ...req.body,
    user_id: id,
  });

  if (validationError) {
    return responseWithError(
      res,
      next,
      409,
      validationError.details[0].message,
    );
  }

  try {
    const board = {
      ...data,
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
  const { id = '' } = req.user || {};

  const { validationError, data } = validateBoard({
    ...req.body,
    user_id: id,
  });

  if (validationError) {
    return responseWithError(res, next, 409, validationError.details[0].message);
  }

  try {
    const board = await Board.findOne({ _id: req.params.id, deleted_at: null });

    if (!board) {
      return responseWithError(
        res,
        next,
        404,
        'Tablica nie istnieje.',
      );
    }

    if (board.user_id.toString() !== req.user.id) {
      return responseWithError(res, next, 403, 'Brak dostępu.');
    }

    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true },
    );

    if (!updatedBoard) {
      return responseWithError(res, next, 409, 'Nie udało się zaktualizować tablicy.');
    }

    return res.status(200).json(updatedBoard);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return responseWithError(res, next, 500, 'Wystąpił błąd.');
  }
};

const deleteBoard = async (req, res, next) => {
  try {
    const board = await Board.findOne({ _id: req.params.id, deleted_at: null });

    if (!board) {
      return responseWithError(res, next, 404, 'Tablica nie istnieje.');
    }

    if (board.user_id.toString() !== req.user.id) {
      return responseWithError(res, next, 403, 'Brak dostępu.');
    }

    const deletedBoard = await Board.findByIdAndUpdate(
      req.params.id,
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
