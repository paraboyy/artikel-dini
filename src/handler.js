import nanoid from "nanoid"; // Pastikan impor ini benar
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

// Buat koneksi pool ke database
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Uji koneksi database
db.getConnection()
  .then(() => console.log("Koneksi database berhasil"))
  .catch((err) => console.error("Koneksi database gagal:", err.message));

// Handler untuk menambahkan artikel
const addArticleHandler = async (request, h) => {
  const { title, body, author } = request.payload;
  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  if (!title) {
    return h
      .response({
        status: "fail",
        message: "Gagal menambahkan artikel. Mohon isi judul artikel",
      })
      .code(400);
  }

  try {
    await db.query(
      "INSERT INTO articles (id, title, body, author, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)",
      [id, title, body, author, createdAt, updatedAt]
    );

    return h
      .response({
        status: "success",
        message: "Artikel berhasil ditambahkan",
        data: { articleId: id },
      })
      .code(201);
  } catch (error) {
    console.error("Error saat menambahkan artikel:", error.message);
    return h
      .response({
        status: "error",
        message: "Gagal menambahkan artikel",
      })
      .code(500);
  }
};

// Handler untuk mendapatkan semua artikel
const getAllArticlesHandler = async () => {
  try {
    const [rows] = await db.query("SELECT id, title, author FROM articles");
    return {
      status: "success",
      data: { articles: rows },
    };
  } catch (error) {
    return {
      status: "error",
      message: "Gagal mengambil artikel",
    };
  }
};

// Handler untuk mendapatkan artikel berdasarkan ID
const getArticleByIdHandler = async (request, h) => {
  const { articleId } = request.params;

  try {
    const [rows] = await db.query("SELECT * FROM articles WHERE id = ?", [
      articleId,
    ]);

    if (rows.length > 0) {
      return {
        status: "success",
        data: { article: rows[0] },
      };
    }

    return h
      .response({
        status: "fail",
        message: "Artikel tidak ditemukan",
      })
      .code(404);
  } catch (error) {
    return h
      .response({
        status: "error",
        message: "Gagal mengambil artikel",
      })
      .code(500);
  }
};

// Handler untuk memperbarui artikel
const updateArticleHandler = async (request, h) => {
  const { articleId } = request.params;
  const { title, body, author } = request.payload;
  const updatedAt = new Date().toISOString();

  try {
    const [result] = await db.query(
      "UPDATE articles SET title = ?, body = ?, author = ?, updated_at = ? WHERE id = ?",
      [title, body, author, updatedAt, articleId]
    );

    if (result.affectedRows > 0) {
      return h
        .response({
          status: "success",
          message: "Artikel berhasil diperbarui",
        })
        .code(200);
    }

    return h
      .response({
        status: "fail",
        message: "Gagal memperbarui artikel. Id tidak ditemukan",
      })
      .code(404);
  } catch (error) {
    return h
      .response({
        status: "error",
        message: "Gagal memperbarui artikel",
      })
      .code(500);
  }
};

// Handler untuk menghapus artikel berdasarkan ID
const deleteArticleByIdHandler = async (request, h) => {
  const { articleId } = request.params;

  try {
    const [result] = await db.query("DELETE FROM articles WHERE id = ?", [
      articleId,
    ]);

    if (result.affectedRows > 0) {
      return h
        .response({
          status: "success",
          message: "Artikel berhasil dihapus",
        })
        .code(200);
    }

    return h
      .response({
        status: "fail",
        message: "Artikel gagal dihapus. Id tidak ditemukan",
      })
      .code(404);
  } catch (error) {
    return h
      .response({
        status: "error",
        message: "Gagal menghapus artikel",
      })
      .code(500);
  }
};

export {
  addArticleHandler,
  getAllArticlesHandler,
  getArticleByIdHandler,
  updateArticleHandler,
  deleteArticleByIdHandler,
};
