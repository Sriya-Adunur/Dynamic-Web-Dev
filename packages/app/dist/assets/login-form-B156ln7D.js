import{i as m,x as f,b as p,a as h,r as l,n as u}from"./reset.css-CrDZLBjt.js";var b=Object.defineProperty,i=(d,e,r,o)=>{for(var t=void 0,a=d.length-1,c;a>=0;a--)(c=d[a])&&(t=c(e,r,t)||t);return t&&b(e,r,t),t};const n=class n extends m{constructor(){super(...arguments),this.formData={},this.redirect="/"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return f`
      <form
        @change=${e=>this.handleChange(e)}
        @submit=${e=>this.handleSubmit(e)}
      >
        <slot></slot>
        <slot name="button">
          <button
            ?disabled=${!this.canSubmit}
            type="submit">
            Login
          </button>
        </slot>
        <p class="error">${this.error}</p>
      </form>
    `}handleChange(e){const r=e.target,o=r==null?void 0:r.name,t=r==null?void 0:r.value,a=this.formData;switch(o){case"username":this.formData={...a,username:t};break;case"password":this.formData={...a,password:t};break}}handleSubmit(e){e.preventDefault(),this.canSubmit&&fetch((this==null?void 0:this.api)||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(r=>{if(r.status!==200&&r.status!==201)throw"Login failed";return r.json()}).then(r=>{const{token:o}=r,t=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:o,ussername:this.formData.username,redirect:this.redirect}]});console.log("dispatching message",t),this.dispatchEvent(t)}).catch(r=>{console.log(r),this.error=r.toString()})}};n.styles=[p,h`
      :host {
      font-family: "Outfit", sans-serif;
      color: var(--color-text);
      background-color: var(--color-background, #fff);
    }

       h2 {
        font-family: "Outfit", sans-serif;
      }

      form {
        font-family: "Outfit", sans-serif;
        display: flex;
        flex-direction: column;
        gap: var(--size-spacing-medium, 1rem);
        padding: var(--size-spacing-large, 2rem);
        border: 1px solid var(--color-border, #ccc);
        border-radius: var(--size-radius-medium, 8px);
        background-color: var(--color-background, #fff);
        max-width: 400px;
        margin: auto;
      }
  
      ::slotted(input) {
        font-family: "Outfit", sans-serif;
        padding: var(--size-spacing-small, 0.75rem);
        font-size: 1rem;
        border: 1px solid var(--color-border, #ccc);
        border-radius: var(--size-radius-small, 4px);
        width: 100%;
      }
  
      ::slotted(button), button {
        ont-family: "Outfit", sans-serif;
        padding: var(--size-spacing-small, 0.75rem);
        font-size: 1rem;
        background-color: var(--color-primary, #3B5441);
        color: white;
        border: none;
        border-radius: var(--size-radius-small, 4px);
        cursor: pointer;
        transition: background-color 0.3s;
      }
     
  
      .error:not(:empty) {
        font-family: "Outfit", sans-serif;
        color: var(--color-error, red);
        border: 1px solid var(--color-error, red);
        background: var(--color-error-bg, #ffe5e5);
        padding: var(--size-spacing-medium, 1rem);
        border-radius: var(--size-radius-small, 4px);
        font-size: 0.95rem;
      }
    `];let s=n;i([l()],s.prototype,"formData");i([u()],s.prototype,"api");i([u()],s.prototype,"redirect");i([l()],s.prototype,"error");export{s as L};
