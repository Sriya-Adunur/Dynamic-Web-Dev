import{i as j,O as _,x as a,a as m,r as k,V as p,b as y,n as S,d as I,f as P,h as C,c as l,_ as z,s as D}from"./reset.css-CrDZLBjt.js";var M=Object.defineProperty,O=(o,e,t,i)=>{for(var r=void 0,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=n(e,t,r)||r);return r&&M(e,t,r),r};const f=class f extends j{constructor(){super(...arguments),this._auth=new _(this,"app:auth"),this.loggedIn=!1}connectedCallback(){super.connectedCallback(),this._auth.observe(e=>{const{user:t}=e;t!=null&&t.authenticated?(this.loggedIn=!0,this.userid=t.username):(this.loggedIn=!1,this.userid=void 0)})}handleSignOut(){this.dispatchEvent(new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signout"]}))}toggleDarkMode(e){const i=e.currentTarget.checked;document.body.dispatchEvent(new CustomEvent("darkmode:toggle",{bubbles:!0,detail:{enabled:i}}))}render(){return a`
      <header class="main-header">
        <div class="left-section">
          ${this.loggedIn?a`<div class="hello-user">Hello, <strong>${this.userid}</strong></div>`:null}
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
            ${this.loggedIn?a`<button @click=${this.handleSignOut}>Sign Out</button>`:a`<a href="/login.html">Sign In</a>`}

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
    `}};f.styles=m`
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
  `;let c=f;O([k()],c.prototype,"loggedIn");O([k()],c.prototype,"userid");const g=class g extends p{constructor(){super("app:model")}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["films/load",{}])}get films(){return this.model.films??[]}render(){return a`
      <section class="movie-list">
        ${this.films.map(e=>a`
            <a href="/app/film/${e._id}/rate" class="movie-tile">
              <img src=${e.filmImage} alt=${e.title} />
            </a>
          `)}
      </section>
    `}};g.styles=[y,m`
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
    `];let u=g;var N=Object.defineProperty,F=(o,e,t,i)=>{for(var r=void 0,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=n(e,t,r)||r);return r&&N(e,t,r),r};const v=class v extends p{get draft(){const e=localStorage.getItem(`draft-${this.filmId}`);return e?JSON.parse(e):{rating:0,comment:""}}get rating(){return this.draft.rating}get comment(){return this.draft.comment}constructor(){super("app:model")}get film(){return this.model.selectedFilm}attributeChangedCallback(e,t,i){super.attributeChangedCallback(e,t,i),e==="film-id"&&i&&t!==i&&this.dispatchMessage(["film/select",{id:i}])}async submitReview(e){e.preventDefault();const t=this.getAuthUser();if(!(t!=null&&t.token)){alert("You must be logged in.");return}(await fetch(`/api/films/${this.filmId}/reviews`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t.token}`},body:JSON.stringify({rating:this.rating,comment:this.comment})})).ok?(this.submitted=!0,this.dispatchMessage(["film/select",{id:this.filmId}])):alert("Failed to submit review")}render(){var e;return this.film?a`
      <section>
        <h2>${this.film.title}</h2>
        <p><strong>Plot:</strong> ${this.film.plot}</p>
        <p><strong>Genres:</strong> ${this.film.genres.join(", ")}</p>
        <ul>
          ${this.film.cast.map(t=>a`<li>${t.name} - ${t.role}</li>`)}
        </ul>
  
        <form @submit=${this.submitReview}>
          <label>Your Rating:</label>
          <select 
            .value=${this.rating.toString()}
            @change=${t=>{const i=parseInt(t.target.value);localStorage.setItem(`draft-${this.filmId}`,JSON.stringify({...this.draft,rating:i}))}}>
            <option value="0">Select</option>
            <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
            <option value="4">⭐️⭐️⭐️⭐️</option>
            <option value="3">⭐️⭐️⭐️</option>
            <option value="2">⭐️⭐️</option>
            <option value="1">⭐️</option>
          </select>
  
          <label>Your Review:</label>
          <textarea
            rows="4"
            .value=${this.comment}
            @input=${t=>{const i=t.target.value;localStorage.setItem(`draft-${this.filmId}`,JSON.stringify({...this.draft,comment:i}))}}>
          </textarea>
          <button type="submit">Submit Review</button>
        </form>

        ${(e=this.film.reviews)!=null&&e.length?a`
                <h3>Reviews</h3>
                <ul>
                  ${this.film.reviews.map(t=>a`
                    <li><strong>${t.username}</strong> rated ${t.rating}/5<br>${t.comment}</li>
                  `)}
                </ul>
              `:a`<p>No reviews yet.</p>`}  
      </section>
    `:a`<p>Loading film...</p>`}};v.styles=[y,m`
      :host {
        display: block;
        font-family: "Lato", sans-serif;
        background-color: var(--color-background-page, #f2efe5);
        padding: 2rem;
      }
  
      section {
        max-width: 600px;
        margin: 0 auto;
        background-color: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
  
      h2 {
        font-family: "Outfit", sans-serif;
        font-size: 2rem;
        margin-bottom: 1rem;
      }
  
      p,
      ul {
        margin-bottom: 1rem;
      }
  
      ul {
        padding-left: 1rem;
      }
  
      label {
        font-weight: bold;
        display: block;
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
      }
  
      select,
      textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        font-size: 1rem;
        margin-bottom: 1rem;
      }
  
      button {
        margin-top: 1rem;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        background-color: var(--color-larger-text, #aa2923);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
      }
  
      button:hover {
        background-color: #881f1a;
      }
  
      .back-link {
        display: block;
        margin-top: 2rem;
        font-weight: bold;
        color: var(--color-larger-text, #aa2923);
        text-decoration: none;
      }
  
      .back-link:hover {
        text-decoration: underline;
      }
  
      h3 {
        margin-top: 2rem;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
      }
  
      .review-list li {
        margin-bottom: 1rem;
      }
    `];let d=v;F([S({attribute:"film-id"})],d.prototype,"filmId");var R=Object.defineProperty,T=(o,e,t,i)=>{for(var r=void 0,s=o.length-1,n;s>=0;s--)(n=o[s])&&(r=n(e,t,r)||r);return r&&R(e,t,r),r};const b=class b extends p{constructor(){super("app:model")}connectedCallback(){super.connectedCallback(),this.dispatchMessage(["profile/select",{userid:this.userid}])}get profile(){return this.model.profile}handleSubmit(e){this.dispatchMessage(["profile/save",{userid:this.userid,profile:e.detail,onSuccess:()=>C.dispatch(this,"history/navigate",{href:`/app/profile/${this.userid}`}),onFailure:t=>console.error("Save failed",t)}])}render(){var e,t,i;return a`
              <main class="page">
                <h2>Edit Profile</h2>
                <mu-form
                  .init=${this.profile}
                  @mu-form:submit=${this.handleSubmit}>
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
              </main>
            `}};b.uses=I({"mu-form":P.Element});let h=b;T([S({attribute:"userid"})],h.prototype,"userid");function $(o,e,t){switch(o[0]){case"film/select":return fetch(`/api/films/${o[1].id}`,{headers:l.headers(t)}).then(i=>i.json()).then(i=>e(r=>({...r,selectedFilm:i})));case"films/load":return fetch("/api/films",{headers:l.headers(t)}).then(i=>i.json()).then(i=>e(r=>({...r,films:i})));case"review/draft":{const{filmId:i,rating:r,comment:s}=o[1];return e(n=>{var x,w;return{...n,reviewDrafts:{...n.reviewDrafts,[i]:{filmId:i,rating:r??((x=n.reviewDrafts[i])==null?void 0:x.rating)??0,comment:s??((w=n.reviewDrafts[i])==null?void 0:w.comment)??""}}}})}case"profile/select":return fetch(`/api/profile/${o[1].userid}`,{headers:l.headers(t)}).then(i=>i.json()).then(i=>e(r=>({...r,profile:i})));case"profile/save":return fetch(`/api/profile/${o[1].userid}`,{method:"PUT",headers:{"Content-Type":"application/json",...l.headers(t)},body:JSON.stringify(o[1].profile)}).then(i=>i.json()).then(i=>{e(r=>({...r,profile:i})),o[1].onSuccess&&o[1].onSuccess()}).catch(i=>{o[1].onFailure&&o[1].onFailure(i)});case"reviews/load":return fetch(`/api/users/${o[1].userid}/reviews`,{headers:l.headers(t)}).then(i=>i.json()).then(i=>e(r=>({...r,myReviews:i})));default:throw new Error(`Unhandled message: ${o[0]}`)}}const J={reviewDrafts:{}};I({"mu-history":C.Provider,"mu-auth":l.Provider,"mu-store":class extends D.Provider{constructor(){console.log("typeof update:",typeof $),super($,J,"app:auth")}},"mu-switch":class extends z.Element{constructor(){super([{path:"/app",view:()=>a`<home-view></home-view>`},{path:"/app/film/:id/rate",view:e=>a`<rating-view film-id=${e.id}></rating-view>`},{path:"/app/profile/:userid/edit",view:e=>a`
              <profile-view userid=${e.userid}></profile-view>
            `},{path:"/app/profile/:userid",view:e=>a`
              <profile-view userid=${e.userid}></profile-view>`},{path:"/",redirect:"/app"}],"app:history","app:auth")}},"site-header":c,"home-view":u,"rating-view":d,"profile-view":h});
