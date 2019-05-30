import { inject } from 'aurelia-framework';
import { ArticleService } from 'services/article-service';
import { UserService } from 'services/user-service';
import { ShopService } from 'services/shop-service';
import { Connection } from 'plugin/connection';
import { Router } from 'aurelia-router';
import { SITEMAP } from 'config/app-config';
import { I18N } from 'aurelia-i18n';

const VIEWMAP = {
  articles: 0,
  details: 1,
  cart: 2
};

@inject(ArticleService, UserService, ShopService, Connection, Router, I18N)
export class Shop {

  viewMap = VIEWMAP;
  cartArticles = [];
  articles = [];

  constructor(
    articleService,
    userService,
    shopService,
    connection,
    router,
    i18n
  ) {
    this._articleService = articleService;
    this._userService = userService;
    this._shopService = shopService;
    this.connection = connection;
    this.status = VIEWMAP.articles;
    this._router = router;
    this._i18n = i18n;
    this.title = i18n.tr('shop.title-products');
  }

  activate() {
    this._userService
      .getUserInfos(this.connection.email)
      .then(res => (this.user = res));
    this._articleService
      .getStoredArticles()
      .then(res => (this.articles = res.article));
  }

  viewDetails(articleId) {
    this.status = VIEWMAP.details;
    this._articleService.getArticle(articleId).then(res => {
      this.article = res;
      this.title = this.article.product_name;
    });
  }

  addArticle(articleId) {
    this._shopService
      .addArticleToCart(this.user.infoUser.id, articleId)
      .then(() => this._articleService
        .getStoredArticles()
        .then(res => (this.articles = res.article)));
  }

  removeArticle(articleId) {
    this._shopService
      .removeArticleFromCart(this.user.infoUser.id, articleId)
      .then(() => this._shopService
        .getArticleInCart(this.user.infoUser.id)
        .then(res => (this.cartArticles = res.panier)));
  }

  viewCart() {
    this.status = VIEWMAP.cart;
    this.title = this._i18n.tr('shop.title-cart');
    this._shopService
      .getArticleInCart(this.user.infoUser.id)
      .then(res => (this.cartArticles = res.panier));
  }

  toArticles() {
    this.status = VIEWMAP.articles;
    this.title = this._i18n.tr('shop.title-products');
    this._articleService
      .getStoredArticles()
      .then(res => (this.articles = res.article));
  }

  validateCart() {
    this._shopService
      .validateCart(this.user.infoUser.id)
      .then(() => this._router.navigateToRoute(SITEMAP.home));
  }

}
