import {
    Auth,
    define,
    History,
    Switch,
    Form
  } from "@calpoly/mustang";
  import { html } from "lit";
  import { HeaderElement } from "./components/site-header";
  import { HomeViewElement } from "./views/home-view";
  import { RatingViewElement } from "./views/rating-view";
  import { ProfileEditElement } from "./views/profile-view";
  import { Store } from "@calpoly/mustang";
  import update from "./update";
  import { Model } from "./model";  
  import { init } from "./model";
  import { Msg } from "./messages";

  const routes = [
    {
      path: "/app",
      view: () => html`<home-view></home-view>`
    },
    {
      path: "/app/film/:id/rate",
      view: (params) => html`<rating-view film-id=${params.id}></rating-view>`
    },
    {
      path: "/",
      redirect: "/app"
    },
    {
      path: "/app/profile/:userid/edit",
      view: (params) => html`
        <profile-view userid=${params["userid"]}></profile-view>`
    },
    {
      path: "/app/profile/:userid",
      view: (params) => html`
        <profile-view userid=${params["userid"]}></profile-view>`
    }
    
  ];
  
  /*define({
    "mu-auth": Auth.Provider,
    "mu-history": History.Provider,
    "site-header": HeaderElement,
    "home-view": HomeViewElement,
    "rating-view": RatingViewElement,
    "mu-switch": class AppSwitch extends Switch.Element {
      constructor() {
        super(routes, "app:history", "app:auth");
      }
    }
  });*/

  define({
    "mu-history": History.Provider,
    "mu-auth": Auth.Provider,
    "mu-store": class AppStore extends Store.Provider<Model, Msg> {
      constructor() {
        console.log("typeof update:", typeof update);  
        super(update, init, "app:auth");
      }
    },
    "mu-switch": class AppSwitch extends Switch.Element {
      constructor() {
        super([
          { path: "/app", view: () => html`<home-view></home-view>` },
          {
            path: "/app/film/:id/rate",
            view: (params) => html`<rating-view film-id=${params.id}></rating-view>`
          },
          {
            path: "/app/profile/:userid/edit",
            view: (params) => html`
              <profile-view userid=${params["userid"]}></profile-view>
            `
          },
          {
            path: "/app/profile/:userid",
            view: (params) => html`
              <profile-view userid=${params["userid"]}></profile-view>`
          },  
          { path: "/", redirect: "/app" }
        ], "app:history", "app:auth");
      }
    },
    "site-header": HeaderElement,
    "home-view": HomeViewElement,
    "rating-view": RatingViewElement,
    "profile-view": ProfileEditElement,
  });
  
  