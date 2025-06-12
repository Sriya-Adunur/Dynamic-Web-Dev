import{i as _,O,x as n,a as h,r as g,V as x,b as j,d as w,f as I,n as C,h as z,c,_ as M,s as D}from"./reset.css-CrDZLBjt.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const T=o=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(o,e)}):customElements.define(o,e)};var L=Object.defineProperty,P=(o,e,t,i)=>{for(var r=void 0,s=o.length-1,a;s>=0;s--)(a=o[s])&&(r=a(e,t,r)||r);return r&&L(e,t,r),r};const $=class $ extends _{constructor(){super(...arguments),this._auth=new O(this,"app:auth"),this.loggedIn=!1}connectedCallback(){super.connectedCallback(),this._auth.observe(e=>{const{user:t}=e;t!=null&&t.authenticated?(this.loggedIn=!0,this.userid=t.username):(this.loggedIn=!1,this.userid=void 0)})}handleSignOut(){this.dispatchEvent(new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signout"]})),location.assign("/login.html")}toggleDarkMode(e){const i=e.currentTarget.checked;document.body.dispatchEvent(new CustomEvent("darkmode:toggle",{bubbles:!0,detail:{enabled:i}}))}render(){return n`
      <header class="main-header">
        <div class="left-section">
          ${this.loggedIn?n`<div class="hello-user">Hello, <strong>${this.userid}</strong></div>`:null}
          <div class="logo">
            <a href="/app" class="logo-link">
              <h1>
                <svg class="icon" aria-hidden="true">
                  <use href="/icons/movies.svg#icon-glasses" />
                </svg>
                SeenThat
              </h1>
            </a>
          </div>
        </div>

        <div class="right-section">
          <nav class="navbar">
            <ul>
              <li>
                <a href=${this.loggedIn?`/app/profile/${this.userid}/edit`:"/login.html"}>
                  Profile
                </a>
              </li>
              <li><a href="/recommendations.html">Get Recommendations</a></li>
              <li><a href="#">Search</a></li>
            </ul>
          </nav>

          <div class="user-controls">
            ${this.loggedIn?n`<button @click=${this.handleSignOut}>Sign Out</button>`:n`<a @click=${()=>location.assign("/login.html")}>Sign In</a>`}

            <label class="darkmode">
              <input
                type="checkbox"
                ?checked=${document.body.classList.contains("dark-mode")}
                @change=${this.toggleDarkMode}
              />
              Dark Mode
            </label>
          </div>
        </div>
      </header>
    `}};$.styles=h`
    .main-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: var(--color-header-background);
      color: var(--color-header-text);
      padding: 1rem 2rem;
      flex-wrap: wrap;
      font-family: "Lato", sans-serif;
    }

    .left-section {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }

    .hello-user {
      font-size: 1rem;
      color: var(--color-header-text);
      font-weight: 500;
    }

    .logo h1 {
      font-size: 1.8rem;
      font-family: "Outfit", sans-serif;
      display: flex;
      align-items: center;
      color: var(--color-accent);
      gap: 0.5rem;
      margin: 0;
    }

    .icon {
      width: 2em;
      height: 1.7em;
      fill: currentColor;
    }

    .right-section {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .navbar ul {
      display: flex;
      gap: 2rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .navbar a {
      text-decoration: none;
      color: var(--color-accent);
      font-weight: 500;
    }

    .navbar a:hover {
      text-decoration: underline;
    }

    .user-controls {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.25rem;
      font-size: 0.95rem;
    }

    .user-controls button {
      background: transparent;
      border: 1px solid var(--color-accent);
      color: var(--color-accent);
      padding: 0.4rem 0.8rem;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.9rem;
    }

    .user-controls button:hover {
      background: var(--color-accent);
      color: var(--color-header-background);
    }

    .darkmode {
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      color: var(--color-accent);
    }
    
    .logo-link {
      text-decoration: none;
      color: inherit;
    }

    .darkmode input[type="checkbox"] {
      accent-color: var(--color-accent);
    }

    @media (max-width: 768px) {
      .main-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .right-section {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
      }

      .user-controls {
        align-items: flex-start;
      }

      .left-section {
        align-items: flex-start;
      }
    }
  `;let u=$;P([g()],u.prototype,"loggedIn");P([g()],u.prototype,"userid");const k=class k extends x{constructor(){super("app:model")}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["films/load",{}])}get films(){return this.model.films??[]}render(){return n`
      <section class="movie-list">
        ${this.films.map(e=>n`
            <a href="/app/film/${e._id}/rate" class="movie-tile">
              <img src=${e.filmImage} alt=${e.title} />
            </a>
          `)}
      </section>
    `}};k.styles=[j,h`
      :host {
        display: block;
        padding: 1rem;
      }

      .movie-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: flex-start;
      }

      .movie-tile {
        display: block;
        width: 198px;
        background: var(--color-header-background);
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        text-decoration: none;
      }

      .movie-tile img {
        width: 100%;
        height: 300px;
        border-radius: 8px;
        object-fit: cover;
        display: block;
      }
    `];let v=k;var R=Object.defineProperty,y=(o,e,t,i)=>{for(var r=void 0,s=o.length-1,a;s>=0;s--)(a=o[s])&&(r=a(e,t,r)||r);return r&&R(e,t,r),r};const p=class p extends x{constructor(){super("app:model"),this._userid="",this._authObserver=new O(this,"app:auth")}get film(){return this._selectedFilm}get myReview(){var e,t;return(t=(e=this.film)==null?void 0:e.reviews)==null?void 0:t.find(i=>i.username===this._userid)}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{var t;(t=e==null?void 0:e.user)!=null&&t.authenticated&&(this._userid=e.user.username)}),this.filmId&&this.dispatchMessage(["film/select",{id:this.filmId,onSuccess:e=>{this._selectedFilm=e}}])}handleSubmit(e){if(!this._userid)return;console.log("user",this._userid);const t={username:this._userid,rating:Number(e.detail.rating),comment:e.detail.comment,date:new Date().toISOString()};this.dispatchMessage(["review/save",{filmId:this.filmId,review:t,onSuccess:()=>this.dispatchMessage(["film/select",{id:this.filmId,onSuccess:i=>this._selectedFilm=i}]),onFailure:i=>console.error("Review save failed",i)}])}render(){var e;return this.film?n`
    <main class="page">
      <h2>${this.film.title}</h2>
      <section class="review-card">
        <p><strong>Plot:</strong> ${this.film.plot}</p>
        <p><strong>Genres:</strong> ${this.film.genres.join(", ")}</p>
        <ul>
          <strong>Cast:</strong>${this.film.cast.map(t=>n`<li>${t.name} - ${t.role}</li>`)}
        </ul>

        <h3>Your Rating:</h3>
        <mu-form .init=${this.myReview} @mu-form:submit=${this.handleSubmit} key=${(e=this.film)==null?void 0:e.id}/>
          <label>
            <select name="rating" required>
              <option value="">Select</option>
              <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
              <option value="4">⭐️⭐️⭐️⭐️</option>
              <option value="3">⭐️⭐️⭐️</option>
              <option value="2">⭐️⭐️</option>
              <option value="1">⭐️</option>
            </select>
          </label>

          <h3>Your Review:</h3>
          <label>
            <textarea name="comment" rows="4" required></textarea>
          </label>

        </mu-form>

        <h3>Reviews</h3>
        <ul>
          ${this.film.reviews.map(t=>n`
              <li>
                <strong>${t.username}</strong> rated ${t.rating}/5<br />
                ${t.comment}
              </li>
            `)}
        </ul>
      </section>
    </main>
    `:n`<p>Loading film...</p>`}};p.uses=w({"mu-form":I.Element}),p.styles=[j,h`
      .page {
        padding: 2rem;
        font-family: "Lato", sans-serif;
        max-width: 600px;
        margin: auto;
        background: #fff;
        border-radius: 0.75rem;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
      }
  
      h2 {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 1rem;
      }
  
      h3 {
        margin-top: 1.5rem;
        font-size: 1.2rem;
      }

      p {
      margin-bottom: 1rem;
       }
  
      label,
      select,
      textarea {
        display: block;
        width: 100%;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
      }
  
      select,
      textarea {
        padding: 0.5rem;
        border: 1px solid #ccc;
        border-radius: 0.25rem;
        font-size: 1rem;
      }
  
      button[type="submit"] {
        padding: 0.6rem 1.2rem;
        background: #a22;
        color: white;
        border: none;
        border-radius: 0.3rem;
        cursor: pointer;
        font-weight: bold;
      }
  
      ul {
        list-style: none;
        padding: 0;
      }

    `];let d=p;y([C({attribute:"film-id"})],d.prototype,"filmId");y([g()],d.prototype,"_userid");y([g()],d.prototype,"_selectedFilm");var N=Object.defineProperty,U=(o,e,t,i)=>{for(var r=void 0,s=o.length-1,a;s>=0;s--)(a=o[s])&&(r=a(e,t,r)||r);return r&&N(e,t,r),r};const f=class f extends x{constructor(){super("app:model")}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["profile/select",{userid:this.userid}])}get profile(){return this.model.profile}handleSubmit(e){this.dispatchMessage(["profile/save",{userid:this.userid,profile:e.detail,onSuccess:()=>z.dispatch(this,"history/navigate",{href:`/app/profile/${this.userid}`}),onFailure:t=>console.error("Save failed",t)}])}render(){var e,t,i;return n`
      <main class="page">
        <h2>Edit Profile</h2>
        <section class="profile-card">
          <mu-form
            .init=${this.profile}
            @mu-form:submit=${this.handleSubmit}
          >
            <label>Username
              <input name="userid" .value=${this.userid??""} readonly />
            </label>

            <label>Name
              <input name="name" .value=${((e=this.profile)==null?void 0:e.name)??""} />
            </label>

            <label>City
              <input name="city" .value=${((t=this.profile)==null?void 0:t.city)??""} />
            </label>

            <label>State
              <input name="state" .value=${((i=this.profile)==null?void 0:i.state)??""} />
            </label>

          </mu-form>
        </section>
      </main>
    `}};f.uses=w({"mu-form":I.Element}),f.styles=h`
  .page {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
  }

  h2 {
    font-family: "Outfit", sans-serif;
    color: var(--color-smaller-text);
    margin-bottom: 1rem;
    font-size: 2rem;
    text-align: center;
  }

  .profile-card {
    background: var(--color-header-background);
    padding: 2.5rem;
    border-radius: 12px;
    max-width: 600px;
    width: 100%;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    color: var(--color-header-text);
    margin: 0 auto;
    justify-content: center;
  }

  mu-form {
    font-family: "Outfit", sans-serif;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 100%;
     justify-content: center;
  }

  mu-form label {
    font-family: "Outfit", sans-serif;
    display: flex;
    flex-direction: column;
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--color-accent);
    width: 100%;
     justify-content: center;
  }

  mu-form input {
    font-family: "Outfit", sans-serif;
    margin-top: 0.5rem;
    padding: 0.8rem 1rem;
    border-radius: 8px;
    border: none;
    font-size: 1.1rem;
    width: 100%;
     justify-content: center;
  }

  mu-form input[readonly] {
    background: #ccc;
    color: #444;
  }

  mu-form button[slot="submit"] {
    font-family: "Outfit", sans-serif;
    background-color: var(--color-accent);
    color: var(--color-header-background);
    font-weight: bold;
    border: none;
    padding: 0.85rem;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    width: 100%;
    transition: background 0.3s;
  }

  mu-form button[slot="submit"]:hover {
    background-color: #c43730;
  }

  @media (max-width: 600px) {
    .profile-card {
      padding: 1.5rem;
    }
  }
`;let m=f;U([C({attribute:"userid"})],m.prototype,"userid");function S(o,e,t){switch(o[0]){case"film/select":{const{id:i,onSuccess:r}=o[1];return fetch(`/api/films/${i}`,{headers:c.headers(t)}).then(s=>s.json()).then(s=>(typeof r=="function"&&r(s),e(a=>({...a,selectedFilm:s}))))}case"films/load":return fetch("/api/films",{headers:c.headers(t)}).then(i=>i.json()).then(i=>e(r=>({...r,films:i})));case"review/save":{const{filmId:i,review:r,onSuccess:s,onFailure:a}=o[1];return fetch(`/api/films/${i}/review`,{method:"PUT",headers:{"Content-Type":"application/json",...c.headers(t)},body:JSON.stringify(r)}).then(l=>{if(!l.ok)throw new Error("Failed to save review");return l.json()}).then(()=>fetch(`/api/films/${i}`,{headers:c.headers(t)})).then(l=>l.json()).then(l=>{e(F=>({...F,selectedFilm:l})),s&&s()}).catch(l=>{a&&a(l)})}case"profile/select":return fetch(`/api/profile/${o[1].userid}`,{headers:c.headers(t)}).then(i=>i.json()).then(i=>e(r=>({...r,profile:i})));case"profile/save":return fetch(`/api/profile/${o[1].userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...c.headers(t)},body:JSON.stringify(o[1].profile)}).then(i=>i.json()).then(i=>{e(r=>({...r,profile:i})),o[1].onSuccess&&o[1].onSuccess()}).catch(i=>{o[1].onFailure&&o[1].onFailure(i)});case"reviews/load":return fetch(`/api/users/${o[1].userid}/reviews`,{headers:c.headers(t)}).then(i=>i.json()).then(i=>e(r=>({...r,myReviews:i})));default:throw new Error(`Unhandled message: ${o[0]}`)}}const q={};var A=Object.getOwnPropertyDescriptor,G=(o,e,t,i)=>{for(var r=i>1?void 0:i?A(e,t):e,s=o.length-1,a;s>=0;s--)(a=o[s])&&(r=a(r)||r);return r};let b=class extends _{render(){return n`
      <a @click=${()=>location.assign("/login.html")}>Sign In</a>
    `}};b.styles=h`
    a {
      font-size: 1.1rem;
      color: var(--color-larger-text);
      cursor: pointer;
      text-decoration: underline;
    }
  `;b=G([T("sign-in-link")],b);w({"mu-history":z.Provider,"mu-auth":c.Provider,"mu-store":class extends D.Provider{constructor(){console.log("typeof update:",typeof S),super(S,q,"app:auth")}},"mu-switch":class extends M.Element{constructor(){super([{path:"/app",view:()=>n`<home-view></home-view>`},{path:"/app/film/:id/rate",view:e=>n`<rating-view film-id=${e.id} userid=${e.userid}></rating-view>`},{path:"/app/profile/:userid/edit",view:e=>n`
              <profile-view userid=${e.userid}></profile-view>
            `},{path:"/app/profile/:userid",view:e=>n`
              <profile-view userid=${e.userid}></profile-view>`},{path:"/",redirect:"/app"}],"app:history","app:auth")}},"site-header":u,"home-view":v,"rating-view":d,"profile-view":m});
