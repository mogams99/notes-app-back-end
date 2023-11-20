const notes = require("./notes");
const {
  nanoid
} = require("nanoid");

// ? fungsi untuk menampilkan halaman home
const showPageHome = () => ({
  status: "success",
  message: "Welcome to Notes App API!",
});

// ? fungsi untuk get all notes
const getAllNotesHandler = () => ({
  status: "success",
  data: {
    notes,
  },
});

// ? fungsi untuk tambah notes
const addNoteHandler = (request, h) => {
  const {
    title,
    tags,
    body
  } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id);

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Catatan berhasil ditambahkan!",
      data: {
        noteId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal ditambahkan!",
  });
  response.code(500);
  return response;
};

// ? fungi untuk get notes by id
const getNoteByIdHandler = (request, h) => {
  const {
    id
  } = request.params;
  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: "success",
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Catatan tidak ditemukan!",
  });
  response.code(404);
  return response;
};

// ? fungsi untuk edit notes
const editNoteByIdHandler = (request, h) => {
  const {
    id
  } = request.params;
  const {
    title,
    tags,
    body
  } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: "success",
      message: "Catatan berhasil diperbarui!",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Catatan gagal berhasil diperbarui!",
  });
  response.code(404);
  return response;
};

// ? fungsi untuk delete notes
const deleteNoteByIdHandler = (request, h) => {
  const {
    id
  } = request.params;
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus!'
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan!',
  });
  response.code(404);
  return response;
};

module.exports = {
  showPageHome,
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteByIdHandler,
  deleteNoteByIdHandler,
};