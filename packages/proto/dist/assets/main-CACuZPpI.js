import{i as u,x as n,r as y,a as c,n as p,O as k,b as f,d as w,c as O}from"./reset.css-CInq1QO0.js";var I=Object.defineProperty,_=(i,t,r,l)=>{for(var e=void 0,s=i.length-1,a;s>=0;s--)(a=i[s])&&(e=a(t,r,e)||e);return e&&I(t,r,e),e};const g=class g extends u{render(){return n`
          <a href=${this.href}>
            ${this.imgSrc?n`<img src=${this.imgSrc} alt="" />`:n`<slot name="title">Untitled</slot>`}
          </a>
        `}};g.styles=[y.styles,c`
        :host {
          display: block;
          background: var(--color-header-background);
          padding: 0rem;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          width: 198px;
        }

        a {
          display: block;
          margin: 0;
          padding: 0;
          text-decoration: none;
          color: inherit;
        }

        img {
          width: 100%;
          height: 300px;
          border-radius: 8px;
          object-fit: cover;
          display: block;
        }

        ::slotted(*) {
          text-align: center;
          margin-top: 0.5rem;
          display: block;
          font-family: "Outfit", sans-serif;
        }
  `];let h=g;_([p({attribute:"img-src"})],h.prototype,"imgSrc");_([p()],h.prototype,"href");var S=Object.defineProperty,x=(i,t,r,l)=>{for(var e=void 0,s=i.length-1,a;s>=0;s--)(a=i[s])&&(e=a(t,r,e)||e);return e&&S(t,r,e),e};const b=class b extends u{constructor(){super(...arguments),this.films=[],this._authObserver=new k(this,"auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{this._user=t.user,this.src&&this.hydrate(this.src)})}get authorization(){var t;if((t=this._user)!=null&&t.authenticated&&"token"in this._user)return{Authorization:`Bearer ${this._user.token}`}}async hydrate(t){try{const r=await fetch(t,{headers:this.authorization});if(!r.ok)throw new Error(`HTTP ${r.status}`);const l=await r.json();this.films=l}catch(r){console.error("Failed to fetch films:",r),this.films=[]}}renderFilm(t){return n`
      <movie-preview
        img-src=${t.filmImage}
        href=${t.ratingLink}
      ></movie-preview>
    `}render(){return n`
      <section class="movie-list">
        ${this.films.map(this.renderFilm)}
      </section>
    `}};b.styles=[y.styles,c`
      :host {
        display: block;
      }

      .movie-list {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        justify-content: flex-start;
      }
    `];let d=b;x([p()],d.prototype,"src");x([f()],d.prototype,"films");var C=Object.defineProperty,$=(i,t,r,l)=>{for(var e=void 0,s=i.length-1,a;s>=0;s--)(a=i[s])&&(e=a(t,r,e)||e);return e&&C(t,r,e),e};const v=class v extends u{constructor(){super(...arguments),this._authObserver=new k(this,"auth"),this.loggedIn=!1}connectedCallback(){super.connectedCallback(),this._authObserver.observe(t=>{const{user:r}=t;r!=null&&r.authenticated?(this.loggedIn=!0,this.userid=r.username):(this.loggedIn=!1,this.userid=void 0)})}renderSignOutButton(){return n`
      <button
        @click=${t=>this.dispatchEvent(new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signout"]}))}
      >
        Sign Out
      </button>
    `}renderSignInLink(){return n`<a href="/login.html">Sign In…</a>`}render(){return n`
      <header>
        <span>Hello, ${this.userid||"User"}</span>
        ${this.loggedIn?this.renderSignOutButton():this.renderSignInLink()}
      </header>
    `}};v.styles=c`
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
    }
  `;let o=v;$([f()],o.prototype,"loggedIn");$([f()],o.prototype,"userid");w({"mu-auth":O.Provider,"movie-preview":h,"film-layout":d,"site-header":o});var m;(m=o.initializeOnce)==null||m.call(o);
