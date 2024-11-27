import pkg from 'nanoid';  // Impor nanoid menggunakan default import
const { nanoid } = pkg;  // Ambil nanoid dari objek default import

const articles = []; 

const addArticleHandler = (request, h) => {
  const { title, body, author } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  if (!title) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan artikel. Mohon isi judul artikel',
    });
    response.code(400);
    return response;
  }

  const newArticle = { id, title, body, author, createdAt, updatedAt };
  articles.push(newArticle);

  const response = h.response({
    status: 'success',
    message: 'Artikel berhasil ditambahkan',
    data: { articleId: id },
  });
  response.code(201);
  return response;
};

const getAllArticlesHandler = () => {
  const responseArticles = articles.map(({ id, title, author }) => ({ id, title, author }));
  return {
    status: 'success',
    data: { articles: responseArticles },
  };
};

const deleteArticleByIdHandler = (request, h) => {
  const { articleId } = request.params;
  const index = articles.findIndex((article) => article.id === articleId);

  if (index !== -1) {
    articles.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Artikel berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Artikel gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

export { addArticleHandler, getAllArticlesHandler, deleteArticleByIdHandler };
