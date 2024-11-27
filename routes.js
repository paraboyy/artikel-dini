import {
    addArticleHandler,
    getAllArticlesHandler,
    deleteArticleByIdHandler,
  } from './handler.js';
  
  const routes = [
    {
      method: 'POST',
      path: '/articles',
      handler: addArticleHandler,
    },
    {
      method: 'GET',
      path: '/articles',
      handler: getAllArticlesHandler,
    },
    {
      method: 'DELETE',
      path: '/articles/{articleId}',
      handler: deleteArticleByIdHandler,
    },
  ];
  
  export default routes;
  