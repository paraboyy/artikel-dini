import { addArticleHandler, getAllArticlesHandler, getArticleByIdHandler, updateArticleHandler, deleteArticleByIdHandler } from "./handler.js";

const routes = [
  {
    method: "POST",
    path: "/articles",
    handler: addArticleHandler,
  },
  {
    method: "GET",
    path: "/articles",
    handler: getAllArticlesHandler,
  },
  {
    method: "GET",
    path: "/articles/{articleId}",
    handler: getArticleByIdHandler,
  },
  {
    method: "PUT",
    path: "/articles/{articleId}",
    handler: updateArticleHandler,
  },
  {
    method: "DELETE",
    path: "/articles/{articleId}",
    handler: deleteArticleByIdHandler,
  },
];

export default routes;
