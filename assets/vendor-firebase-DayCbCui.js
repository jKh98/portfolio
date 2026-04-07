const Jl=()=>{};var zo={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lc=function(n){const t=[];let e=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?t[e++]=s:s<2048?(t[e++]=s>>6|192,t[e++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),t[e++]=s>>18|240,t[e++]=s>>12&63|128,t[e++]=s>>6&63|128,t[e++]=s&63|128):(t[e++]=s>>12|224,t[e++]=s>>6&63|128,t[e++]=s&63|128)}return t},Xl=function(n){const t=[];let e=0,r=0;for(;e<n.length;){const s=n[e++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[e++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[e++],a=n[e++],l=n[e++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|l&63)-65536;t[r++]=String.fromCharCode(55296+(h>>10)),t[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[e++],a=n[e++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return t.join("")},hc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,t){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const e=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,l=a?n[s+1]:0,h=s+2<n.length,f=h?n[s+2]:0,m=o>>2,T=(o&3)<<4|l>>4;let R=(l&15)<<2|f>>6,P=f&63;h||(P=64,a||(R=64)),r.push(e[m],e[T],e[R],e[P])}return r.join("")},encodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(n):this.encodeByteArray(lc(n),t)},decodeString(n,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(n):Xl(this.decodeStringToByteArray(n,t))},decodeStringToByteArray(n,t){this.init_();const e=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=e[n.charAt(s++)],l=s<n.length?e[n.charAt(s)]:0;++s;const f=s<n.length?e[n.charAt(s)]:64;++s;const T=s<n.length?e[n.charAt(s)]:64;if(++s,o==null||l==null||f==null||T==null)throw new Zl;const R=o<<2|l>>4;if(r.push(R),f!==64){const P=l<<4&240|f>>2;if(r.push(P),T!==64){const N=f<<6&192|T;r.push(N)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Zl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const th=function(n){const t=lc(n);return hc.encodeByteArray(t,!0)},dr=function(n){return th(n).replace(/\./g,"")},eh=function(n){try{return hc.decodeString(n,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rh=()=>nh().__FIREBASE_DEFAULTS__,sh=()=>{if(typeof process>"u"||typeof zo>"u")return;const n=zo.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},ih=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=n&&eh(n[1]);return t&&JSON.parse(t)},Ys=()=>{try{return Jl()||rh()||sh()||ih()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},oh=n=>{var t,e;return(e=(t=Ys())==null?void 0:t.emulatorHosts)==null?void 0:e[n]},ah=n=>{const t=oh(n);if(!t)return;const e=t.lastIndexOf(":");if(e<=0||e+1===t.length)throw new Error(`Invalid host ${t} with no separate hostname and port!`);const r=parseInt(t.substring(e+1),10);return t[0]==="["?[t.substring(1,e-1),r]:[t.substring(0,e),r]},fc=()=>{var n;return(n=Ys())==null?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ch{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}wrapCallback(t){return(e,r)=>{e?this.reject(e):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(e):t(e,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uh(n,t){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const e={alg:"none",type:"JWT"},r=t||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...n};return[dr(JSON.stringify(e)),dr(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lh(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function hh(){var t;const n=(t=Ys())==null?void 0:t.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function dc(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function fh(){return!hh()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Js(){try{return typeof indexedDB=="object"}catch{return!1}}function Xs(){return new Promise((n,t)=>{try{let e=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),e||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{e=!1},s.onerror=()=>{var o;t(((o=s.error)==null?void 0:o.message)||"")}}catch(e){t(e)}})}function mc(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dh="FirebaseError";class ue extends Error{constructor(t,e,r){super(e),this.code=t,this.customData=r,this.name=dh,Object.setPrototypeOf(this,ue.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Cr.prototype.create)}}class Cr{constructor(t,e,r){this.service=t,this.serviceName=e,this.errors=r}create(t,...e){const r=e[0]||{},s=`${this.service}/${t}`,o=this.errors[t],a=o?mh(o,r):"Error",l=`${this.serviceName}: ${a} (${s}).`;return new ue(s,l,r)}}function mh(n,t){return n.replace(ph,(e,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const ph=/\{\$([^}]+)}/g;function Rn(n,t){if(n===t)return!0;const e=Object.keys(n),r=Object.keys(t);for(const s of e){if(!r.includes(s))return!1;const o=n[s],a=t[s];if(Go(o)&&Go(a)){if(!Rn(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!e.includes(s))return!1;return!0}function Go(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gh=1e3,_h=2,yh=14400*1e3,Eh=.5;function Ho(n,t=gh,e=_h){const r=t*Math.pow(e,n),s=Math.round(Eh*r*(Math.random()-.5)*2);return Math.min(yh,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ft(n){return n&&n._delegate?n._delegate:n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pc(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Th(n){return(await fetch(n,{credentials:"include"})).ok}class qt{constructor(t,e,r){this.name=t,this.instanceFactory=e,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _e="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ih{constructor(t,e){this.name=t,this.container=e,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const e=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(e)){const r=new ch;if(this.instancesDeferred.set(e,r),this.isInitialized(e)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:e});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(e).promise}getImmediate(t){const e=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),r=(t==null?void 0:t.optional)??!1;if(this.isInitialized(e)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:e})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(vh(t))try{this.getOrInitializeService({instanceIdentifier:_e})}catch{}for(const[e,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(e);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=_e){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(e=>"INTERNAL"in e).map(e=>e.INTERNAL.delete()),...t.filter(e=>"_delete"in e).map(e=>e._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=_e){return this.instances.has(t)}getOptions(t=_e){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:e={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:e});for(const[o,a]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(o);r===l&&a.resolve(s)}return s}onInit(t,e){const r=this.normalizeInstanceIdentifier(e),s=this.onInitCallbacks.get(r)??new Set;s.add(t),this.onInitCallbacks.set(r,s);const o=this.instances.get(r);return o&&t(o,r),()=>{s.delete(t)}}invokeOnInitCallbacks(t,e){const r=this.onInitCallbacks.get(e);if(r)for(const s of r)try{s(t,e)}catch{}}getOrInitializeService({instanceIdentifier:t,options:e={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:wh(t),options:e}),this.instances.set(t,r),this.instancesOptions.set(t,e),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=_e){return this.component?this.component.multipleInstances?t:_e:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function wh(n){return n===_e?void 0:n}function vh(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ah{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const e=this.getProvider(t.name);if(e.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);e.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const e=new Ih(t,this);return this.providers.set(t,e),e}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})($||($={}));const Rh={debug:$.DEBUG,verbose:$.VERBOSE,info:$.INFO,warn:$.WARN,error:$.ERROR,silent:$.SILENT},Sh=$.INFO,bh={[$.DEBUG]:"log",[$.VERBOSE]:"log",[$.INFO]:"info",[$.WARN]:"warn",[$.ERROR]:"error"},Ph=(n,t,...e)=>{if(t<n.logLevel)return;const r=new Date().toISOString(),s=bh[t];if(s)console[s](`[${r}]  ${n.name}:`,...e);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class Zs{constructor(t){this.name=t,this._logLevel=Sh,this._logHandler=Ph,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in $))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?Rh[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,$.DEBUG,...t),this._logHandler(this,$.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,$.VERBOSE,...t),this._logHandler(this,$.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,$.INFO,...t),this._logHandler(this,$.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,$.WARN,...t),this._logHandler(this,$.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,$.ERROR,...t),this._logHandler(this,$.ERROR,...t)}}const Ch=(n,t)=>t.some(e=>n instanceof e);let Ko,Wo;function Vh(){return Ko||(Ko=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Dh(){return Wo||(Wo=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const gc=new WeakMap,Ps=new WeakMap,_c=new WeakMap,gs=new WeakMap,ti=new WeakMap;function Nh(n){const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{e(Xt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return t.then(e=>{e instanceof IDBCursor&&gc.set(e,n)}).catch(()=>{}),ti.set(t,n),t}function kh(n){if(Ps.has(n))return;const t=new Promise((e,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{e(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});Ps.set(n,t)}let Cs={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Ps.get(n);if(t==="objectStoreNames")return n.objectStoreNames||_c.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return Xt(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function Oh(n){Cs=n(Cs)}function Mh(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...e){const r=n.call(_s(this),t,...e);return _c.set(r,t.sort?t.sort():[t]),Xt(r)}:Dh().includes(n)?function(...t){return n.apply(_s(this),t),Xt(gc.get(this))}:function(...t){return Xt(n.apply(_s(this),t))}}function xh(n){return typeof n=="function"?Mh(n):(n instanceof IDBTransaction&&kh(n),Ch(n,Vh())?new Proxy(n,Cs):n)}function Xt(n){if(n instanceof IDBRequest)return Nh(n);if(gs.has(n))return gs.get(n);const t=xh(n);return t!==n&&(gs.set(n,t),ti.set(t,n)),t}const _s=n=>ti.get(n);function yc(n,t,{blocked:e,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,t),l=Xt(a);return r&&a.addEventListener("upgradeneeded",h=>{r(Xt(a.result),h.oldVersion,h.newVersion,Xt(a.transaction),h)}),e&&a.addEventListener("blocked",h=>e(h.oldVersion,h.newVersion,h)),l.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",f=>s(f.oldVersion,f.newVersion,f))}).catch(()=>{}),l}const Lh=["get","getKey","getAll","getAllKeys","count"],Fh=["put","add","delete","clear"],ys=new Map;function Qo(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(ys.get(t))return ys.get(t);const e=t.replace(/FromIndex$/,""),r=t!==e,s=Fh.includes(e);if(!(e in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Lh.includes(e)))return;const o=async function(a,...l){const h=this.transaction(a,s?"readwrite":"readonly");let f=h.store;return r&&(f=f.index(l.shift())),(await Promise.all([f[e](...l),s&&h.done]))[0]};return ys.set(t,o),o}Oh(n=>({...n,get:(t,e,r)=>Qo(t,e)||n.get(t,e,r),has:(t,e)=>!!Qo(t,e)||n.has(t,e)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uh{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(e=>{if(Bh(e)){const r=e.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(e=>e).join(" ")}}function Bh(n){const t=n.getComponent();return(t==null?void 0:t.type)==="VERSION"}const Vs="@firebase/app",Yo="0.14.10";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jt=new Zs("@firebase/app"),qh="@firebase/app-compat",jh="@firebase/analytics-compat",$h="@firebase/analytics",zh="@firebase/app-check-compat",Gh="@firebase/app-check",Hh="@firebase/auth",Kh="@firebase/auth-compat",Wh="@firebase/database",Qh="@firebase/data-connect",Yh="@firebase/database-compat",Jh="@firebase/functions",Xh="@firebase/functions-compat",Zh="@firebase/installations",tf="@firebase/installations-compat",ef="@firebase/messaging",nf="@firebase/messaging-compat",rf="@firebase/performance",sf="@firebase/performance-compat",of="@firebase/remote-config",af="@firebase/remote-config-compat",cf="@firebase/storage",uf="@firebase/storage-compat",lf="@firebase/firestore",hf="@firebase/ai",ff="@firebase/firestore-compat",df="firebase",mf="12.11.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ds="[DEFAULT]",pf={[Vs]:"fire-core",[qh]:"fire-core-compat",[$h]:"fire-analytics",[jh]:"fire-analytics-compat",[Gh]:"fire-app-check",[zh]:"fire-app-check-compat",[Hh]:"fire-auth",[Kh]:"fire-auth-compat",[Wh]:"fire-rtdb",[Qh]:"fire-data-connect",[Yh]:"fire-rtdb-compat",[Jh]:"fire-fn",[Xh]:"fire-fn-compat",[Zh]:"fire-iid",[tf]:"fire-iid-compat",[ef]:"fire-fcm",[nf]:"fire-fcm-compat",[rf]:"fire-perf",[sf]:"fire-perf-compat",[of]:"fire-rc",[af]:"fire-rc-compat",[cf]:"fire-gcs",[uf]:"fire-gcs-compat",[lf]:"fire-fst",[ff]:"fire-fst-compat",[hf]:"fire-vertex","fire-js":"fire-js",[df]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mr=new Map,gf=new Map,Ns=new Map;function Jo(n,t){try{n.container.addComponent(t)}catch(e){jt.debug(`Component ${t.name} failed to register with FirebaseApp ${n.name}`,e)}}function ne(n){const t=n.name;if(Ns.has(t))return jt.debug(`There were multiple attempts to register component ${t}.`),!1;Ns.set(t,n);for(const e of mr.values())Jo(e,n);for(const e of gf.values())Jo(e,n);return!0}function Mn(n,t){const e=n.container.getProvider("heartbeat").getImmediate({optional:!0});return e&&e.triggerHeartbeat(),n.container.getProvider(t)}function _f(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Zt=new Cr("app","Firebase",yf);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ef{constructor(t,e,r){this._isDeleted=!1,this._options={...t},this._config={...e},this._name=e.name,this._automaticDataCollectionEnabled=e.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new qt("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw Zt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tf=mf;function If(n,t={}){let e=n;typeof t!="object"&&(t={name:t});const r={name:Ds,automaticDataCollectionEnabled:!0,...t},s=r.name;if(typeof s!="string"||!s)throw Zt.create("bad-app-name",{appName:String(s)});if(e||(e=fc()),!e)throw Zt.create("no-options");const o=mr.get(s);if(o){if(Rn(e,o.options)&&Rn(r,o.config))return o;throw Zt.create("duplicate-app",{appName:s})}const a=new Ah(s);for(const h of Ns.values())a.addComponent(h);const l=new Ef(e,r,a);return mr.set(s,l),l}function Ec(n=Ds){const t=mr.get(n);if(!t&&n===Ds&&fc())return If();if(!t)throw Zt.create("no-app",{appName:n});return t}function Ot(n,t,e){let r=pf[n]??n;e&&(r+=`-${e}`);const s=r.match(/\s|\//),o=t.match(/\s|\//);if(s||o){const a=[`Unable to register library "${r}" with version "${t}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${t}" contains illegal characters (whitespace or "/")`),jt.warn(a.join(" "));return}ne(new qt(`${r}-version`,()=>({library:r,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wf="firebase-heartbeat-database",vf=1,Sn="firebase-heartbeat-store";let Es=null;function Tc(){return Es||(Es=yc(wf,vf,{upgrade:(n,t)=>{switch(t){case 0:try{n.createObjectStore(Sn)}catch(e){console.warn(e)}}}}).catch(n=>{throw Zt.create("idb-open",{originalErrorMessage:n.message})})),Es}async function Af(n){try{const e=(await Tc()).transaction(Sn),r=await e.objectStore(Sn).get(Ic(n));return await e.done,r}catch(t){if(t instanceof ue)jt.warn(t.message);else{const e=Zt.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});jt.warn(e.message)}}}async function Xo(n,t){try{const r=(await Tc()).transaction(Sn,"readwrite");await r.objectStore(Sn).put(t,Ic(n)),await r.done}catch(e){if(e instanceof ue)jt.warn(e.message);else{const r=Zt.create("idb-set",{originalErrorMessage:e==null?void 0:e.message});jt.warn(r.message)}}}function Ic(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rf=1024,Sf=30;class bf{constructor(t){this.container=t,this._heartbeatsCache=null;const e=this.container.getProvider("app").getImmediate();this._storage=new Cf(e),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,e;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Zo();if(((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>Sf){const a=Vf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){jt.warn(r)}}async getHeartbeatsHeader(){var t;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Zo(),{heartbeatsToSend:r,unsentEntries:s}=Pf(this._heartbeatsCache.heartbeats),o=dr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=e,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(e){return jt.warn(e),""}}}function Zo(){return new Date().toISOString().substring(0,10)}function Pf(n,t=Rf){const e=[];let r=n.slice();for(const s of n){const o=e.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),ta(e)>t){o.dates.pop();break}}else if(e.push({agent:s.agent,dates:[s.date]}),ta(e)>t){e.pop();break}r=r.slice(1)}return{heartbeatsToSend:e,unsentEntries:r}}class Cf{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Js()?Xs().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const e=await Af(this.app);return e!=null&&e.heartbeats?e:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return Xo(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){if(await this._canUseIndexedDBPromise){const r=await this.read();return Xo(this.app,{lastSentHeartbeatDate:t.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...t.heartbeats]})}else return}}function ta(n){return dr(JSON.stringify({version:2,heartbeats:n})).length}function Vf(n){if(n.length===0)return-1;let t=0,e=n[0].date;for(let r=1;r<n.length;r++)n[r].date<e&&(e=n[r].date,t=r);return t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Df(n){ne(new qt("platform-logger",t=>new Uh(t),"PRIVATE")),ne(new qt("heartbeat",t=>new bf(t),"PRIVATE")),Ot(Vs,Yo,n),Ot(Vs,Yo,"esm2020"),Ot("fire-js","")}Df("");const wc="@firebase/installations",ei="0.6.21";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vc=1e4,Ac=`w:${ei}`,Rc="FIS_v2",Nf="https://firebaseinstallations.googleapis.com/v1",kf=3600*1e3,Of="installations",Mf="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xf={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},we=new Cr(Of,Mf,xf);function Sc(n){return n instanceof ue&&n.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bc({projectId:n}){return`${Nf}/projects/${n}/installations`}function Pc(n){return{token:n.token,requestStatus:2,expiresIn:Ff(n.expiresIn),creationTime:Date.now()}}async function Cc(n,t){const r=(await t.json()).error;return we.create("request-failed",{requestName:n,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function Vc({apiKey:n}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":n})}function Lf(n,{refreshToken:t}){const e=Vc(n);return e.append("Authorization",Uf(t)),e}async function Dc(n){const t=await n();return t.status>=500&&t.status<600?n():t}function Ff(n){return Number(n.replace("s","000"))}function Uf(n){return`${Rc} ${n}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Bf({appConfig:n,heartbeatServiceProvider:t},{fid:e}){const r=bc(n),s=Vc(n),o=t.getImmediate({optional:!0});if(o){const f=await o.getHeartbeatsHeader();f&&s.append("x-firebase-client",f)}const a={fid:e,authVersion:Rc,appId:n.appId,sdkVersion:Ac},l={method:"POST",headers:s,body:JSON.stringify(a)},h=await Dc(()=>fetch(r,l));if(h.ok){const f=await h.json();return{fid:f.fid||e,registrationStatus:2,refreshToken:f.refreshToken,authToken:Pc(f.authToken)}}else throw await Cc("Create Installation",h)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nc(n){return new Promise(t=>{setTimeout(t,n)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qf(n){return btoa(String.fromCharCode(...n)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jf=/^[cdef][\w-]{21}$/,ks="";function $f(){try{const n=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(n),n[0]=112+n[0]%16;const e=zf(n);return jf.test(e)?e:ks}catch{return ks}}function zf(n){return qf(n).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vr(n){return`${n.appName}!${n.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kc=new Map;function Oc(n,t){const e=Vr(n);Mc(e,t),Gf(e,t)}function Mc(n,t){const e=kc.get(n);if(e)for(const r of e)r(t)}function Gf(n,t){const e=Hf();e&&e.postMessage({key:n,fid:t}),Kf()}let ye=null;function Hf(){return!ye&&"BroadcastChannel"in self&&(ye=new BroadcastChannel("[Firebase] FID Change"),ye.onmessage=n=>{Mc(n.data.key,n.data.fid)}),ye}function Kf(){kc.size===0&&ye&&(ye.close(),ye=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wf="firebase-installations-database",Qf=1,ve="firebase-installations-store";let Ts=null;function ni(){return Ts||(Ts=yc(Wf,Qf,{upgrade:(n,t)=>{switch(t){case 0:n.createObjectStore(ve)}}})),Ts}async function pr(n,t){const e=Vr(n),s=(await ni()).transaction(ve,"readwrite"),o=s.objectStore(ve),a=await o.get(e);return await o.put(t,e),await s.done,(!a||a.fid!==t.fid)&&Oc(n,t.fid),t}async function xc(n){const t=Vr(n),r=(await ni()).transaction(ve,"readwrite");await r.objectStore(ve).delete(t),await r.done}async function Dr(n,t){const e=Vr(n),s=(await ni()).transaction(ve,"readwrite"),o=s.objectStore(ve),a=await o.get(e),l=t(a);return l===void 0?await o.delete(e):await o.put(l,e),await s.done,l&&(!a||a.fid!==l.fid)&&Oc(n,l.fid),l}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ri(n){let t;const e=await Dr(n.appConfig,r=>{const s=Yf(r),o=Jf(n,s);return t=o.registrationPromise,o.installationEntry});return e.fid===ks?{installationEntry:await t}:{installationEntry:e,registrationPromise:t}}function Yf(n){const t=n||{fid:$f(),registrationStatus:0};return Lc(t)}function Jf(n,t){if(t.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(we.create("app-offline"));return{installationEntry:t,registrationPromise:s}}const e={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=Xf(n,e);return{installationEntry:e,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:Zf(n)}:{installationEntry:t}}async function Xf(n,t){try{const e=await Bf(n,t);return pr(n.appConfig,e)}catch(e){throw Sc(e)&&e.customData.serverCode===409?await xc(n.appConfig):await pr(n.appConfig,{fid:t.fid,registrationStatus:0}),e}}async function Zf(n){let t=await ea(n.appConfig);for(;t.registrationStatus===1;)await Nc(100),t=await ea(n.appConfig);if(t.registrationStatus===0){const{installationEntry:e,registrationPromise:r}=await ri(n);return r||e}return t}function ea(n){return Dr(n,t=>{if(!t)throw we.create("installation-not-found");return Lc(t)})}function Lc(n){return td(n)?{fid:n.fid,registrationStatus:0}:n}function td(n){return n.registrationStatus===1&&n.registrationTime+vc<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ed({appConfig:n,heartbeatServiceProvider:t},e){const r=nd(n,e),s=Lf(n,e),o=t.getImmediate({optional:!0});if(o){const f=await o.getHeartbeatsHeader();f&&s.append("x-firebase-client",f)}const a={installation:{sdkVersion:Ac,appId:n.appId}},l={method:"POST",headers:s,body:JSON.stringify(a)},h=await Dc(()=>fetch(r,l));if(h.ok){const f=await h.json();return Pc(f)}else throw await Cc("Generate Auth Token",h)}function nd(n,{fid:t}){return`${bc(n)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function si(n,t=!1){let e;const r=await Dr(n.appConfig,o=>{if(!Fc(o))throw we.create("not-registered");const a=o.authToken;if(!t&&id(a))return o;if(a.requestStatus===1)return e=rd(n,t),o;{if(!navigator.onLine)throw we.create("app-offline");const l=ad(o);return e=sd(n,l),l}});return e?await e:r.authToken}async function rd(n,t){let e=await na(n.appConfig);for(;e.authToken.requestStatus===1;)await Nc(100),e=await na(n.appConfig);const r=e.authToken;return r.requestStatus===0?si(n,t):r}function na(n){return Dr(n,t=>{if(!Fc(t))throw we.create("not-registered");const e=t.authToken;return cd(e)?{...t,authToken:{requestStatus:0}}:t})}async function sd(n,t){try{const e=await ed(n,t),r={...t,authToken:e};return await pr(n.appConfig,r),e}catch(e){if(Sc(e)&&(e.customData.serverCode===401||e.customData.serverCode===404))await xc(n.appConfig);else{const r={...t,authToken:{requestStatus:0}};await pr(n.appConfig,r)}throw e}}function Fc(n){return n!==void 0&&n.registrationStatus===2}function id(n){return n.requestStatus===2&&!od(n)}function od(n){const t=Date.now();return t<n.creationTime||n.creationTime+n.expiresIn<t+kf}function ad(n){const t={requestStatus:1,requestTime:Date.now()};return{...n,authToken:t}}function cd(n){return n.requestStatus===1&&n.requestTime+vc<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ud(n){const t=n,{installationEntry:e,registrationPromise:r}=await ri(t);return r?r.catch(console.error):si(t).catch(console.error),e.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ld(n,t=!1){const e=n;return await hd(e),(await si(e,t)).token}async function hd(n){const{registrationPromise:t}=await ri(n);t&&await t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fd(n){if(!n||!n.options)throw Is("App Configuration");if(!n.name)throw Is("App Name");const t=["projectId","apiKey","appId"];for(const e of t)if(!n.options[e])throw Is(e);return{appName:n.name,projectId:n.options.projectId,apiKey:n.options.apiKey,appId:n.options.appId}}function Is(n){return we.create("missing-app-config-values",{valueName:n})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uc="installations",dd="installations-internal",md=n=>{const t=n.getProvider("app").getImmediate(),e=fd(t),r=Mn(t,"heartbeat");return{app:t,appConfig:e,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},pd=n=>{const t=n.getProvider("app").getImmediate(),e=Mn(t,Uc).getImmediate();return{getId:()=>ud(e),getToken:s=>ld(e,s)}};function gd(){ne(new qt(Uc,md,"PUBLIC")),ne(new qt(dd,pd,"PRIVATE"))}gd();Ot(wc,ei);Ot(wc,ei,"esm2020");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gr="analytics",_d="firebase_id",yd="origin",Ed=60*1e3,Td="https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig",ii="https://www.googletagmanager.com/gtag/js";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tt=new Zs("@firebase/analytics");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Id={"already-exists":"A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.","already-initialized":"initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.","already-initialized-settings":"Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.","interop-component-reg-failed":"Firebase Analytics Interop Component failed to instantiate: {$reason}","invalid-analytics-context":"Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","indexeddb-unavailable":"IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}","fetch-throttle":"The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.","config-fetch-failed":"Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}","no-api-key":'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',"no-app-id":'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',"no-client-id":'The "client_id" field is empty.',"invalid-gtag-resource":"Trusted Types detected an invalid gtag resource: {$gtagURL}."},At=new Cr("analytics","Analytics",Id);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wd(n){if(!n.startsWith(ii)){const t=At.create("invalid-gtag-resource",{gtagURL:n});return Tt.warn(t.message),""}return n}function Bc(n){return Promise.all(n.map(t=>t.catch(e=>e)))}function vd(n,t){let e;return window.trustedTypes&&(e=window.trustedTypes.createPolicy(n,t)),e}function Ad(n,t){const e=vd("firebase-js-sdk-policy",{createScriptURL:wd}),r=document.createElement("script"),s=`${ii}?l=${n}&id=${t}`;r.src=e?e==null?void 0:e.createScriptURL(s):s,r.async=!0,document.head.appendChild(r)}function Rd(n){let t=[];return Array.isArray(window[n])?t=window[n]:window[n]=t,t}async function Sd(n,t,e,r,s,o){const a=r[s];try{if(a)await t[a];else{const h=(await Bc(e)).find(f=>f.measurementId===s);h&&await t[h.appId]}}catch(l){Tt.error(l)}n("config",s,o)}async function bd(n,t,e,r,s){try{let o=[];if(s&&s.send_to){let a=s.send_to;Array.isArray(a)||(a=[a]);const l=await Bc(e);for(const h of a){const f=l.find(T=>T.measurementId===h),m=f&&t[f.appId];if(m)o.push(m);else{o=[];break}}}o.length===0&&(o=Object.values(t)),await Promise.all(o),n("event",r,s||{})}catch(o){Tt.error(o)}}function Pd(n,t,e,r){async function s(o,...a){try{if(o==="event"){const[l,h]=a;await bd(n,t,e,l,h)}else if(o==="config"){const[l,h]=a;await Sd(n,t,e,r,l,h)}else if(o==="consent"){const[l,h]=a;n("consent",l,h)}else if(o==="get"){const[l,h,f]=a;n("get",l,h,f)}else if(o==="set"){const[l]=a;n("set",l)}else n(o,...a)}catch(l){Tt.error(l)}}return s}function Cd(n,t,e,r,s){let o=function(...a){window[r].push(arguments)};return window[s]&&typeof window[s]=="function"&&(o=window[s]),window[s]=Pd(o,n,t,e),{gtagCore:o,wrappedGtag:window[s]}}function Vd(n){const t=window.document.getElementsByTagName("script");for(const e of Object.values(t))if(e.src&&e.src.includes(ii)&&e.src.includes(n))return e;return null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dd=30,Nd=1e3;class kd{constructor(t={},e=Nd){this.throttleMetadata=t,this.intervalMillis=e}getThrottleMetadata(t){return this.throttleMetadata[t]}setThrottleMetadata(t,e){this.throttleMetadata[t]=e}deleteThrottleMetadata(t){delete this.throttleMetadata[t]}}const qc=new kd;function Od(n){return new Headers({Accept:"application/json","x-goog-api-key":n})}async function Md(n){var a;const{appId:t,apiKey:e}=n,r={method:"GET",headers:Od(e)},s=Td.replace("{app-id}",t),o=await fetch(s,r);if(o.status!==200&&o.status!==304){let l="";try{const h=await o.json();(a=h.error)!=null&&a.message&&(l=h.error.message)}catch{}throw At.create("config-fetch-failed",{httpStatus:o.status,responseMessage:l})}return o.json()}async function xd(n,t=qc,e){const{appId:r,apiKey:s,measurementId:o}=n.options;if(!r)throw At.create("no-app-id");if(!s){if(o)return{measurementId:o,appId:r};throw At.create("no-api-key")}const a=t.getThrottleMetadata(r)||{backoffCount:0,throttleEndTimeMillis:Date.now()},l=new Ud;return setTimeout(async()=>{l.abort()},Ed),jc({appId:r,apiKey:s,measurementId:o},a,l,t)}async function jc(n,{throttleEndTimeMillis:t,backoffCount:e},r,s=qc){var l;const{appId:o,measurementId:a}=n;try{await Ld(r,t)}catch(h){if(a)return Tt.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${h==null?void 0:h.message}]`),{appId:o,measurementId:a};throw h}try{const h=await Md(n);return s.deleteThrottleMetadata(o),h}catch(h){const f=h;if(!Fd(f)){if(s.deleteThrottleMetadata(o),a)return Tt.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${a} provided in the "measurementId" field in the local Firebase config. [${f==null?void 0:f.message}]`),{appId:o,measurementId:a};throw h}const m=Number((l=f==null?void 0:f.customData)==null?void 0:l.httpStatus)===503?Ho(e,s.intervalMillis,Dd):Ho(e,s.intervalMillis),T={throttleEndTimeMillis:Date.now()+m,backoffCount:e+1};return s.setThrottleMetadata(o,T),Tt.debug(`Calling attemptFetch again in ${m} millis`),jc(n,T,r,s)}}function Ld(n,t){return new Promise((e,r)=>{const s=Math.max(t-Date.now(),0),o=setTimeout(e,s);n.addEventListener(()=>{clearTimeout(o),r(At.create("fetch-throttle",{throttleEndTimeMillis:t}))})})}function Fd(n){if(!(n instanceof ue)||!n.customData)return!1;const t=Number(n.customData.httpStatus);return t===429||t===500||t===503||t===504}class Ud{constructor(){this.listeners=[]}addEventListener(t){this.listeners.push(t)}abort(){this.listeners.forEach(t=>t())}}async function Bd(n,t,e,r,s){if(s&&s.global){n("event",e,r);return}else{const o=await t,a={...r,send_to:o};n("event",e,a)}}async function qd(n,t,e,r){if(r&&r.global){const s={};for(const o of Object.keys(e))s[`user_properties.${o}`]=e[o];return n("set",s),Promise.resolve()}else{const s=await t;n("config",s,{update:!0,user_properties:e})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jd(){if(Js())try{await Xs()}catch(n){return Tt.warn(At.create("indexeddb-unavailable",{errorInfo:n==null?void 0:n.toString()}).message),!1}else return Tt.warn(At.create("indexeddb-unavailable",{errorInfo:"IndexedDB is not available in this environment."}).message),!1;return!0}async function $d(n,t,e,r,s,o,a){const l=xd(n);l.then(R=>{e[R.measurementId]=R.appId,n.options.measurementId&&R.measurementId!==n.options.measurementId&&Tt.warn(`The measurement ID in the local Firebase config (${n.options.measurementId}) does not match the measurement ID fetched from the server (${R.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)}).catch(R=>Tt.error(R)),t.push(l);const h=jd().then(R=>{if(R)return r.getId()}),[f,m]=await Promise.all([l,h]);Vd(o)||Ad(o,f.measurementId),s("js",new Date);const T=(a==null?void 0:a.config)??{};return T[yd]="firebase",T.update=!0,m!=null&&(T[_d]=m),s("config",f.measurementId,T),f.measurementId}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{constructor(t){this.app=t}_delete(){return delete Fe[this.app.options.appId],Promise.resolve()}}let Fe={},ra=[];const sa={};let ws="dataLayer",Gd="gtag",ia,oi,oa=!1;function Hd(){const n=[];if(dc()&&n.push("This is a browser extension environment."),mc()||n.push("Cookies are not available."),n.length>0){const t=n.map((r,s)=>`(${s+1}) ${r}`).join(" "),e=At.create("invalid-analytics-context",{errorInfo:t});Tt.warn(e.message)}}function Kd(n,t,e){Hd();const r=n.options.appId;if(!r)throw At.create("no-app-id");if(!n.options.apiKey)if(n.options.measurementId)Tt.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${n.options.measurementId} provided in the "measurementId" field in the local Firebase config.`);else throw At.create("no-api-key");if(Fe[r]!=null)throw At.create("already-exists",{id:r});if(!oa){Rd(ws);const{wrappedGtag:o,gtagCore:a}=Cd(Fe,ra,sa,ws,Gd);oi=o,ia=a,oa=!0}return Fe[r]=$d(n,ra,sa,t,ia,ws,e),new zd(n)}function R_(n=Ec()){n=Ft(n);const t=Mn(n,gr);return t.isInitialized()?t.getImmediate():Wd(n)}function Wd(n,t={}){const e=Mn(n,gr);if(e.isInitialized()){const s=e.getImmediate();if(Rn(t,e.getOptions()))return s;throw At.create("already-initialized")}return e.initialize({options:t})}async function S_(){if(dc()||!mc()||!Js())return!1;try{return await Xs()}catch{return!1}}function Qd(n,t,e){n=Ft(n),qd(oi,Fe[n.app.options.appId],t,e).catch(r=>Tt.error(r))}function Yd(n,t,e,r){n=Ft(n),Bd(oi,Fe[n.app.options.appId],t,e,r).catch(s=>Tt.error(s))}const aa="@firebase/analytics",ca="0.10.21";function Jd(){ne(new qt(gr,(t,{options:e})=>{const r=t.getProvider("app").getImmediate(),s=t.getProvider("installations-internal").getImmediate();return Kd(r,s,e)},"PUBLIC")),ne(new qt("analytics-internal",n,"PRIVATE")),Ot(aa,ca),Ot(aa,ca,"esm2020");function n(t){try{const e=t.getProvider(gr).getImmediate();return{logEvent:(r,s,o)=>Yd(e,r,s,o),setUserProperties:(r,s)=>Qd(e,r,s)}}catch(e){throw At.create("interop-component-reg-failed",{reason:e})}}}Jd();var Xd="firebase",Zd="12.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ot(Xd,Zd,"app");var ua=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var te,$c;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(E,p){function _(){}_.prototype=p.prototype,E.F=p.prototype,E.prototype=new _,E.prototype.constructor=E,E.D=function(I,y,v){for(var g=Array(arguments.length-2),It=2;It<arguments.length;It++)g[It-2]=arguments[It];return p.prototype[y].apply(I,g)}}function e(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}t(r,e),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,p,_){_||(_=0);const I=Array(16);if(typeof p=="string")for(var y=0;y<16;++y)I[y]=p.charCodeAt(_++)|p.charCodeAt(_++)<<8|p.charCodeAt(_++)<<16|p.charCodeAt(_++)<<24;else for(y=0;y<16;++y)I[y]=p[_++]|p[_++]<<8|p[_++]<<16|p[_++]<<24;p=E.g[0],_=E.g[1],y=E.g[2];let v=E.g[3],g;g=p+(v^_&(y^v))+I[0]+3614090360&4294967295,p=_+(g<<7&4294967295|g>>>25),g=v+(y^p&(_^y))+I[1]+3905402710&4294967295,v=p+(g<<12&4294967295|g>>>20),g=y+(_^v&(p^_))+I[2]+606105819&4294967295,y=v+(g<<17&4294967295|g>>>15),g=_+(p^y&(v^p))+I[3]+3250441966&4294967295,_=y+(g<<22&4294967295|g>>>10),g=p+(v^_&(y^v))+I[4]+4118548399&4294967295,p=_+(g<<7&4294967295|g>>>25),g=v+(y^p&(_^y))+I[5]+1200080426&4294967295,v=p+(g<<12&4294967295|g>>>20),g=y+(_^v&(p^_))+I[6]+2821735955&4294967295,y=v+(g<<17&4294967295|g>>>15),g=_+(p^y&(v^p))+I[7]+4249261313&4294967295,_=y+(g<<22&4294967295|g>>>10),g=p+(v^_&(y^v))+I[8]+1770035416&4294967295,p=_+(g<<7&4294967295|g>>>25),g=v+(y^p&(_^y))+I[9]+2336552879&4294967295,v=p+(g<<12&4294967295|g>>>20),g=y+(_^v&(p^_))+I[10]+4294925233&4294967295,y=v+(g<<17&4294967295|g>>>15),g=_+(p^y&(v^p))+I[11]+2304563134&4294967295,_=y+(g<<22&4294967295|g>>>10),g=p+(v^_&(y^v))+I[12]+1804603682&4294967295,p=_+(g<<7&4294967295|g>>>25),g=v+(y^p&(_^y))+I[13]+4254626195&4294967295,v=p+(g<<12&4294967295|g>>>20),g=y+(_^v&(p^_))+I[14]+2792965006&4294967295,y=v+(g<<17&4294967295|g>>>15),g=_+(p^y&(v^p))+I[15]+1236535329&4294967295,_=y+(g<<22&4294967295|g>>>10),g=p+(y^v&(_^y))+I[1]+4129170786&4294967295,p=_+(g<<5&4294967295|g>>>27),g=v+(_^y&(p^_))+I[6]+3225465664&4294967295,v=p+(g<<9&4294967295|g>>>23),g=y+(p^_&(v^p))+I[11]+643717713&4294967295,y=v+(g<<14&4294967295|g>>>18),g=_+(v^p&(y^v))+I[0]+3921069994&4294967295,_=y+(g<<20&4294967295|g>>>12),g=p+(y^v&(_^y))+I[5]+3593408605&4294967295,p=_+(g<<5&4294967295|g>>>27),g=v+(_^y&(p^_))+I[10]+38016083&4294967295,v=p+(g<<9&4294967295|g>>>23),g=y+(p^_&(v^p))+I[15]+3634488961&4294967295,y=v+(g<<14&4294967295|g>>>18),g=_+(v^p&(y^v))+I[4]+3889429448&4294967295,_=y+(g<<20&4294967295|g>>>12),g=p+(y^v&(_^y))+I[9]+568446438&4294967295,p=_+(g<<5&4294967295|g>>>27),g=v+(_^y&(p^_))+I[14]+3275163606&4294967295,v=p+(g<<9&4294967295|g>>>23),g=y+(p^_&(v^p))+I[3]+4107603335&4294967295,y=v+(g<<14&4294967295|g>>>18),g=_+(v^p&(y^v))+I[8]+1163531501&4294967295,_=y+(g<<20&4294967295|g>>>12),g=p+(y^v&(_^y))+I[13]+2850285829&4294967295,p=_+(g<<5&4294967295|g>>>27),g=v+(_^y&(p^_))+I[2]+4243563512&4294967295,v=p+(g<<9&4294967295|g>>>23),g=y+(p^_&(v^p))+I[7]+1735328473&4294967295,y=v+(g<<14&4294967295|g>>>18),g=_+(v^p&(y^v))+I[12]+2368359562&4294967295,_=y+(g<<20&4294967295|g>>>12),g=p+(_^y^v)+I[5]+4294588738&4294967295,p=_+(g<<4&4294967295|g>>>28),g=v+(p^_^y)+I[8]+2272392833&4294967295,v=p+(g<<11&4294967295|g>>>21),g=y+(v^p^_)+I[11]+1839030562&4294967295,y=v+(g<<16&4294967295|g>>>16),g=_+(y^v^p)+I[14]+4259657740&4294967295,_=y+(g<<23&4294967295|g>>>9),g=p+(_^y^v)+I[1]+2763975236&4294967295,p=_+(g<<4&4294967295|g>>>28),g=v+(p^_^y)+I[4]+1272893353&4294967295,v=p+(g<<11&4294967295|g>>>21),g=y+(v^p^_)+I[7]+4139469664&4294967295,y=v+(g<<16&4294967295|g>>>16),g=_+(y^v^p)+I[10]+3200236656&4294967295,_=y+(g<<23&4294967295|g>>>9),g=p+(_^y^v)+I[13]+681279174&4294967295,p=_+(g<<4&4294967295|g>>>28),g=v+(p^_^y)+I[0]+3936430074&4294967295,v=p+(g<<11&4294967295|g>>>21),g=y+(v^p^_)+I[3]+3572445317&4294967295,y=v+(g<<16&4294967295|g>>>16),g=_+(y^v^p)+I[6]+76029189&4294967295,_=y+(g<<23&4294967295|g>>>9),g=p+(_^y^v)+I[9]+3654602809&4294967295,p=_+(g<<4&4294967295|g>>>28),g=v+(p^_^y)+I[12]+3873151461&4294967295,v=p+(g<<11&4294967295|g>>>21),g=y+(v^p^_)+I[15]+530742520&4294967295,y=v+(g<<16&4294967295|g>>>16),g=_+(y^v^p)+I[2]+3299628645&4294967295,_=y+(g<<23&4294967295|g>>>9),g=p+(y^(_|~v))+I[0]+4096336452&4294967295,p=_+(g<<6&4294967295|g>>>26),g=v+(_^(p|~y))+I[7]+1126891415&4294967295,v=p+(g<<10&4294967295|g>>>22),g=y+(p^(v|~_))+I[14]+2878612391&4294967295,y=v+(g<<15&4294967295|g>>>17),g=_+(v^(y|~p))+I[5]+4237533241&4294967295,_=y+(g<<21&4294967295|g>>>11),g=p+(y^(_|~v))+I[12]+1700485571&4294967295,p=_+(g<<6&4294967295|g>>>26),g=v+(_^(p|~y))+I[3]+2399980690&4294967295,v=p+(g<<10&4294967295|g>>>22),g=y+(p^(v|~_))+I[10]+4293915773&4294967295,y=v+(g<<15&4294967295|g>>>17),g=_+(v^(y|~p))+I[1]+2240044497&4294967295,_=y+(g<<21&4294967295|g>>>11),g=p+(y^(_|~v))+I[8]+1873313359&4294967295,p=_+(g<<6&4294967295|g>>>26),g=v+(_^(p|~y))+I[15]+4264355552&4294967295,v=p+(g<<10&4294967295|g>>>22),g=y+(p^(v|~_))+I[6]+2734768916&4294967295,y=v+(g<<15&4294967295|g>>>17),g=_+(v^(y|~p))+I[13]+1309151649&4294967295,_=y+(g<<21&4294967295|g>>>11),g=p+(y^(_|~v))+I[4]+4149444226&4294967295,p=_+(g<<6&4294967295|g>>>26),g=v+(_^(p|~y))+I[11]+3174756917&4294967295,v=p+(g<<10&4294967295|g>>>22),g=y+(p^(v|~_))+I[2]+718787259&4294967295,y=v+(g<<15&4294967295|g>>>17),g=_+(v^(y|~p))+I[9]+3951481745&4294967295,E.g[0]=E.g[0]+p&4294967295,E.g[1]=E.g[1]+(y+(g<<21&4294967295|g>>>11))&4294967295,E.g[2]=E.g[2]+y&4294967295,E.g[3]=E.g[3]+v&4294967295}r.prototype.v=function(E,p){p===void 0&&(p=E.length);const _=p-this.blockSize,I=this.C;let y=this.h,v=0;for(;v<p;){if(y==0)for(;v<=_;)s(this,E,v),v+=this.blockSize;if(typeof E=="string"){for(;v<p;)if(I[y++]=E.charCodeAt(v++),y==this.blockSize){s(this,I),y=0;break}}else for(;v<p;)if(I[y++]=E[v++],y==this.blockSize){s(this,I),y=0;break}}this.h=y,this.o+=p},r.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var p=1;p<E.length-8;++p)E[p]=0;p=this.o*8;for(var _=E.length-8;_<E.length;++_)E[_]=p&255,p/=256;for(this.v(E),E=Array(16),p=0,_=0;_<4;++_)for(let I=0;I<32;I+=8)E[p++]=this.g[_]>>>I&255;return E};function o(E,p){var _=l;return Object.prototype.hasOwnProperty.call(_,E)?_[E]:_[E]=p(E)}function a(E,p){this.h=p;const _=[];let I=!0;for(let y=E.length-1;y>=0;y--){const v=E[y]|0;I&&v==p||(_[y]=v,I=!1)}this.g=_}var l={};function h(E){return-128<=E&&E<128?o(E,function(p){return new a([p|0],p<0?-1:0)}):new a([E|0],E<0?-1:0)}function f(E){if(isNaN(E)||!isFinite(E))return T;if(E<0)return k(f(-E));const p=[];let _=1;for(let I=0;E>=_;I++)p[I]=E/_|0,_*=4294967296;return new a(p,0)}function m(E,p){if(E.length==0)throw Error("number format error: empty string");if(p=p||10,p<2||36<p)throw Error("radix out of range: "+p);if(E.charAt(0)=="-")return k(m(E.substring(1),p));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=f(Math.pow(p,8));let I=T;for(let v=0;v<E.length;v+=8){var y=Math.min(8,E.length-v);const g=parseInt(E.substring(v,v+y),p);y<8?(y=f(Math.pow(p,y)),I=I.j(y).add(f(g))):(I=I.j(_),I=I.add(f(g)))}return I}var T=h(0),R=h(1),P=h(16777216);n=a.prototype,n.m=function(){if(M(this))return-k(this).m();let E=0,p=1;for(let _=0;_<this.g.length;_++){const I=this.i(_);E+=(I>=0?I:4294967296+I)*p,p*=4294967296}return E},n.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(N(this))return"0";if(M(this))return"-"+k(this).toString(E);const p=f(Math.pow(E,6));var _=this;let I="";for(;;){const y=Rt(_,p).g;_=K(_,y.j(p));let v=((_.g.length>0?_.g[0]:_.h)>>>0).toString(E);if(_=y,N(_))return v+I;for(;v.length<6;)v="0"+v;I=v+I}},n.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function N(E){if(E.h!=0)return!1;for(let p=0;p<E.g.length;p++)if(E.g[p]!=0)return!1;return!0}function M(E){return E.h==-1}n.l=function(E){return E=K(this,E),M(E)?-1:N(E)?0:1};function k(E){const p=E.g.length,_=[];for(let I=0;I<p;I++)_[I]=~E.g[I];return new a(_,~E.h).add(R)}n.abs=function(){return M(this)?k(this):this},n.add=function(E){const p=Math.max(this.g.length,E.g.length),_=[];let I=0;for(let y=0;y<=p;y++){let v=I+(this.i(y)&65535)+(E.i(y)&65535),g=(v>>>16)+(this.i(y)>>>16)+(E.i(y)>>>16);I=g>>>16,v&=65535,g&=65535,_[y]=g<<16|v}return new a(_,_[_.length-1]&-2147483648?-1:0)};function K(E,p){return E.add(k(p))}n.j=function(E){if(N(this)||N(E))return T;if(M(this))return M(E)?k(this).j(k(E)):k(k(this).j(E));if(M(E))return k(this.j(k(E)));if(this.l(P)<0&&E.l(P)<0)return f(this.m()*E.m());const p=this.g.length+E.g.length,_=[];for(var I=0;I<2*p;I++)_[I]=0;for(I=0;I<this.g.length;I++)for(let y=0;y<E.g.length;y++){const v=this.i(I)>>>16,g=this.i(I)&65535,It=E.i(y)>>>16,he=E.i(y)&65535;_[2*I+2*y]+=g*he,G(_,2*I+2*y),_[2*I+2*y+1]+=v*he,G(_,2*I+2*y+1),_[2*I+2*y+1]+=g*It,G(_,2*I+2*y+1),_[2*I+2*y+2]+=v*It,G(_,2*I+2*y+2)}for(E=0;E<p;E++)_[E]=_[2*E+1]<<16|_[2*E];for(E=p;E<2*p;E++)_[E]=0;return new a(_,0)};function G(E,p){for(;(E[p]&65535)!=E[p];)E[p+1]+=E[p]>>>16,E[p]&=65535,p++}function X(E,p){this.g=E,this.h=p}function Rt(E,p){if(N(p))throw Error("division by zero");if(N(E))return new X(T,T);if(M(E))return p=Rt(k(E),p),new X(k(p.g),k(p.h));if(M(p))return p=Rt(E,k(p)),new X(k(p.g),p.h);if(E.g.length>30){if(M(E)||M(p))throw Error("slowDivide_ only works with positive integers.");for(var _=R,I=p;I.l(E)<=0;)_=ft(_),I=ft(I);var y=dt(_,1),v=dt(I,1);for(I=dt(I,2),_=dt(_,2);!N(I);){var g=v.add(I);g.l(E)<=0&&(y=y.add(_),v=g),I=dt(I,1),_=dt(_,1)}return p=K(E,y.j(p)),new X(y,p)}for(y=T;E.l(p)>=0;){for(_=Math.max(1,Math.floor(E.m()/p.m())),I=Math.ceil(Math.log(_)/Math.LN2),I=I<=48?1:Math.pow(2,I-48),v=f(_),g=v.j(p);M(g)||g.l(E)>0;)_-=I,v=f(_),g=v.j(p);N(v)&&(v=R),y=y.add(v),E=K(E,g)}return new X(y,E)}n.B=function(E){return Rt(this,E).h},n.and=function(E){const p=Math.max(this.g.length,E.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)&E.i(I);return new a(_,this.h&E.h)},n.or=function(E){const p=Math.max(this.g.length,E.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)|E.i(I);return new a(_,this.h|E.h)},n.xor=function(E){const p=Math.max(this.g.length,E.g.length),_=[];for(let I=0;I<p;I++)_[I]=this.i(I)^E.i(I);return new a(_,this.h^E.h)};function ft(E){const p=E.g.length+1,_=[];for(let I=0;I<p;I++)_[I]=E.i(I)<<1|E.i(I-1)>>>31;return new a(_,E.h)}function dt(E,p){const _=p>>5;p%=32;const I=E.g.length-_,y=[];for(let v=0;v<I;v++)y[v]=p>0?E.i(v+_)>>>p|E.i(v+_+1)<<32-p:E.i(v+_);return new a(y,E.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,$c=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=f,a.fromString=m,te=a}).apply(typeof ua<"u"?ua:typeof self<"u"?self:typeof window<"u"?window:{});var nr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var zc,gn,Gc,ar,Os,Hc,Kc,Wc;(function(){var n,t=Object.defineProperty;function e(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof nr=="object"&&nr];for(var c=0;c<i.length;++c){var u=i[c];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var r=e(this);function s(i,c){if(c)t:{var u=r;i=i.split(".");for(var d=0;d<i.length-1;d++){var w=i[d];if(!(w in u))break t;u=u[w]}i=i[i.length-1],d=u[i],c=c(d),c!=d&&c!=null&&t(u,i,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(i){return i||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(i){return i||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(i){return i||function(c){var u=[],d;for(d in c)Object.prototype.hasOwnProperty.call(c,d)&&u.push([d,c[d]]);return u}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function l(i){var c=typeof i;return c=="object"&&i!=null||c=="function"}function h(i,c,u){return i.call.apply(i.bind,arguments)}function f(i,c,u){return f=h,f.apply(null,arguments)}function m(i,c){var u=Array.prototype.slice.call(arguments,1);return function(){var d=u.slice();return d.push.apply(d,arguments),i.apply(this,d)}}function T(i,c){function u(){}u.prototype=c.prototype,i.Z=c.prototype,i.prototype=new u,i.prototype.constructor=i,i.Ob=function(d,w,A){for(var C=Array(arguments.length-2),U=2;U<arguments.length;U++)C[U-2]=arguments[U];return c.prototype[w].apply(d,C)}}var R=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?i=>i&&AsyncContext.Snapshot.wrap(i):i=>i;function P(i){const c=i.length;if(c>0){const u=Array(c);for(let d=0;d<c;d++)u[d]=i[d];return u}return[]}function N(i,c){for(let d=1;d<arguments.length;d++){const w=arguments[d];var u=typeof w;if(u=u!="object"?u:w?Array.isArray(w)?"array":u:"null",u=="array"||u=="object"&&typeof w.length=="number"){u=i.length||0;const A=w.length||0;i.length=u+A;for(let C=0;C<A;C++)i[u+C]=w[C]}else i.push(w)}}class M{constructor(c,u){this.i=c,this.j=u,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function k(i){a.setTimeout(()=>{throw i},0)}function K(){var i=E;let c=null;return i.g&&(c=i.g,i.g=i.g.next,i.g||(i.h=null),c.next=null),c}class G{constructor(){this.h=this.g=null}add(c,u){const d=X.get();d.set(c,u),this.h?this.h.next=d:this.g=d,this.h=d}}var X=new M(()=>new Rt,i=>i.reset());class Rt{constructor(){this.next=this.g=this.h=null}set(c,u){this.h=c,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let ft,dt=!1,E=new G,p=()=>{const i=Promise.resolve(void 0);ft=()=>{i.then(_)}};function _(){for(var i;i=K();){try{i.h.call(i.g)}catch(u){k(u)}var c=X;c.j(i),c.h<100&&(c.h++,i.next=c.g,c.g=i)}dt=!1}function I(){this.u=this.u,this.C=this.C}I.prototype.u=!1,I.prototype.dispose=function(){this.u||(this.u=!0,this.N())},I.prototype[Symbol.dispose]=function(){this.dispose()},I.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function y(i,c){this.type=i,this.g=this.target=c,this.defaultPrevented=!1}y.prototype.h=function(){this.defaultPrevented=!0};var v=(function(){if(!a.addEventListener||!Object.defineProperty)return!1;var i=!1,c=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const u=()=>{};a.addEventListener("test",u,c),a.removeEventListener("test",u,c)}catch{}return i})();function g(i){return/^[\s\xa0]*$/.test(i)}function It(i,c){y.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i&&this.init(i,c)}T(It,y),It.prototype.init=function(i,c){const u=this.type=i.type,d=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;this.target=i.target||i.srcElement,this.g=c,c=i.relatedTarget,c||(u=="mouseover"?c=i.fromElement:u=="mouseout"&&(c=i.toElement)),this.relatedTarget=c,d?(this.clientX=d.clientX!==void 0?d.clientX:d.pageX,this.clientY=d.clientY!==void 0?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=i.pointerType,this.state=i.state,this.i=i,i.defaultPrevented&&It.Z.h.call(this)},It.prototype.h=function(){It.Z.h.call(this);const i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var he="closure_listenable_"+(Math.random()*1e6|0),El=0;function Tl(i,c,u,d,w){this.listener=i,this.proxy=null,this.src=c,this.type=u,this.capture=!!d,this.ha=w,this.key=++El,this.da=this.fa=!1}function qn(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function jn(i,c,u){for(const d in i)c.call(u,i[d],d,i)}function Il(i,c){for(const u in i)c.call(void 0,i[u],u,i)}function ji(i){const c={};for(const u in i)c[u]=i[u];return c}const $i="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function zi(i,c){let u,d;for(let w=1;w<arguments.length;w++){d=arguments[w];for(u in d)i[u]=d[u];for(let A=0;A<$i.length;A++)u=$i[A],Object.prototype.hasOwnProperty.call(d,u)&&(i[u]=d[u])}}function $n(i){this.src=i,this.g={},this.h=0}$n.prototype.add=function(i,c,u,d,w){const A=i.toString();i=this.g[A],i||(i=this.g[A]=[],this.h++);const C=Kr(i,c,d,w);return C>-1?(c=i[C],u||(c.fa=!1)):(c=new Tl(c,this.src,A,!!d,w),c.fa=u,i.push(c)),c};function Hr(i,c){const u=c.type;if(u in i.g){var d=i.g[u],w=Array.prototype.indexOf.call(d,c,void 0),A;(A=w>=0)&&Array.prototype.splice.call(d,w,1),A&&(qn(c),i.g[u].length==0&&(delete i.g[u],i.h--))}}function Kr(i,c,u,d){for(let w=0;w<i.length;++w){const A=i[w];if(!A.da&&A.listener==c&&A.capture==!!u&&A.ha==d)return w}return-1}var Wr="closure_lm_"+(Math.random()*1e6|0),Qr={};function Gi(i,c,u,d,w){if(Array.isArray(c)){for(let A=0;A<c.length;A++)Gi(i,c[A],u,d,w);return null}return u=Wi(u),i&&i[he]?i.J(c,u,l(d)?!!d.capture:!1,w):wl(i,c,u,!1,d,w)}function wl(i,c,u,d,w,A){if(!c)throw Error("Invalid event type");const C=l(w)?!!w.capture:!!w;let U=Jr(i);if(U||(i[Wr]=U=new $n(i)),u=U.add(c,u,d,C,A),u.proxy)return u;if(d=vl(),u.proxy=d,d.src=i,d.listener=u,i.addEventListener)v||(w=C),w===void 0&&(w=!1),i.addEventListener(c.toString(),d,w);else if(i.attachEvent)i.attachEvent(Ki(c.toString()),d);else if(i.addListener&&i.removeListener)i.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");return u}function vl(){function i(u){return c.call(i.src,i.listener,u)}const c=Al;return i}function Hi(i,c,u,d,w){if(Array.isArray(c))for(var A=0;A<c.length;A++)Hi(i,c[A],u,d,w);else d=l(d)?!!d.capture:!!d,u=Wi(u),i&&i[he]?(i=i.i,A=String(c).toString(),A in i.g&&(c=i.g[A],u=Kr(c,u,d,w),u>-1&&(qn(c[u]),Array.prototype.splice.call(c,u,1),c.length==0&&(delete i.g[A],i.h--)))):i&&(i=Jr(i))&&(c=i.g[c.toString()],i=-1,c&&(i=Kr(c,u,d,w)),(u=i>-1?c[i]:null)&&Yr(u))}function Yr(i){if(typeof i!="number"&&i&&!i.da){var c=i.src;if(c&&c[he])Hr(c.i,i);else{var u=i.type,d=i.proxy;c.removeEventListener?c.removeEventListener(u,d,i.capture):c.detachEvent?c.detachEvent(Ki(u),d):c.addListener&&c.removeListener&&c.removeListener(d),(u=Jr(c))?(Hr(u,i),u.h==0&&(u.src=null,c[Wr]=null)):qn(i)}}}function Ki(i){return i in Qr?Qr[i]:Qr[i]="on"+i}function Al(i,c){if(i.da)i=!0;else{c=new It(c,this);const u=i.listener,d=i.ha||i.src;i.fa&&Yr(i),i=u.call(d,c)}return i}function Jr(i){return i=i[Wr],i instanceof $n?i:null}var Xr="__closure_events_fn_"+(Math.random()*1e9>>>0);function Wi(i){return typeof i=="function"?i:(i[Xr]||(i[Xr]=function(c){return i.handleEvent(c)}),i[Xr])}function mt(){I.call(this),this.i=new $n(this),this.M=this,this.G=null}T(mt,I),mt.prototype[he]=!0,mt.prototype.removeEventListener=function(i,c,u,d){Hi(this,i,c,u,d)};function yt(i,c){var u,d=i.G;if(d)for(u=[];d;d=d.G)u.push(d);if(i=i.M,d=c.type||c,typeof c=="string")c=new y(c,i);else if(c instanceof y)c.target=c.target||i;else{var w=c;c=new y(d,i),zi(c,w)}w=!0;let A,C;if(u)for(C=u.length-1;C>=0;C--)A=c.g=u[C],w=zn(A,d,!0,c)&&w;if(A=c.g=i,w=zn(A,d,!0,c)&&w,w=zn(A,d,!1,c)&&w,u)for(C=0;C<u.length;C++)A=c.g=u[C],w=zn(A,d,!1,c)&&w}mt.prototype.N=function(){if(mt.Z.N.call(this),this.i){var i=this.i;for(const c in i.g){const u=i.g[c];for(let d=0;d<u.length;d++)qn(u[d]);delete i.g[c],i.h--}}this.G=null},mt.prototype.J=function(i,c,u,d){return this.i.add(String(i),c,!1,u,d)},mt.prototype.K=function(i,c,u,d){return this.i.add(String(i),c,!0,u,d)};function zn(i,c,u,d){if(c=i.i.g[String(c)],!c)return!0;c=c.concat();let w=!0;for(let A=0;A<c.length;++A){const C=c[A];if(C&&!C.da&&C.capture==u){const U=C.listener,st=C.ha||C.src;C.fa&&Hr(i.i,C),w=U.call(st,d)!==!1&&w}}return w&&!d.defaultPrevented}function Rl(i,c){if(typeof i!="function")if(i&&typeof i.handleEvent=="function")i=f(i.handleEvent,i);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(i,c||0)}function Qi(i){i.g=Rl(()=>{i.g=null,i.i&&(i.i=!1,Qi(i))},i.l);const c=i.h;i.h=null,i.m.apply(null,c)}class Sl extends I{constructor(c,u){super(),this.m=c,this.l=u,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Qi(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Xe(i){I.call(this),this.h=i,this.g={}}T(Xe,I);var Yi=[];function Ji(i){jn(i.g,function(c,u){this.g.hasOwnProperty(u)&&Yr(c)},i),i.g={}}Xe.prototype.N=function(){Xe.Z.N.call(this),Ji(this)},Xe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Zr=a.JSON.stringify,bl=a.JSON.parse,Pl=class{stringify(i){return a.JSON.stringify(i,void 0)}parse(i){return a.JSON.parse(i,void 0)}};function Xi(){}function Zi(){}var Ze={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ts(){y.call(this,"d")}T(ts,y);function es(){y.call(this,"c")}T(es,y);var fe={},to=null;function Gn(){return to=to||new mt}fe.Ia="serverreachability";function eo(i){y.call(this,fe.Ia,i)}T(eo,y);function tn(i){const c=Gn();yt(c,new eo(c))}fe.STAT_EVENT="statevent";function no(i,c){y.call(this,fe.STAT_EVENT,i),this.stat=c}T(no,y);function Et(i){const c=Gn();yt(c,new no(c,i))}fe.Ja="timingevent";function ro(i,c){y.call(this,fe.Ja,i),this.size=c}T(ro,y);function en(i,c){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){i()},c)}function nn(){this.g=!0}nn.prototype.ua=function(){this.g=!1};function Cl(i,c,u,d,w,A){i.info(function(){if(i.g)if(A){var C="",U=A.split("&");for(let H=0;H<U.length;H++){var st=U[H].split("=");if(st.length>1){const at=st[0];st=st[1];const Nt=at.split("_");C=Nt.length>=2&&Nt[1]=="type"?C+(at+"="+st+"&"):C+(at+"=redacted&")}}}else C=null;else C=A;return"XMLHTTP REQ ("+d+") [attempt "+w+"]: "+c+`
`+u+`
`+C})}function Vl(i,c,u,d,w,A,C){i.info(function(){return"XMLHTTP RESP ("+d+") [ attempt "+w+"]: "+c+`
`+u+`
`+A+" "+C})}function De(i,c,u,d){i.info(function(){return"XMLHTTP TEXT ("+c+"): "+Nl(i,u)+(d?" "+d:"")})}function Dl(i,c){i.info(function(){return"TIMEOUT: "+c})}nn.prototype.info=function(){};function Nl(i,c){if(!i.g)return c;if(!c)return null;try{const A=JSON.parse(c);if(A){for(i=0;i<A.length;i++)if(Array.isArray(A[i])){var u=A[i];if(!(u.length<2)){var d=u[1];if(Array.isArray(d)&&!(d.length<1)){var w=d[0];if(w!="noop"&&w!="stop"&&w!="close")for(let C=1;C<d.length;C++)d[C]=""}}}}return Zr(A)}catch{return c}}var Hn={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},so={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},io;function ns(){}T(ns,Xi),ns.prototype.g=function(){return new XMLHttpRequest},io=new ns;function rn(i){return encodeURIComponent(String(i))}function kl(i){var c=1;i=i.split(":");const u=[];for(;c>0&&i.length;)u.push(i.shift()),c--;return i.length&&u.push(i.join(":")),u}function Gt(i,c,u,d){this.j=i,this.i=c,this.l=u,this.S=d||1,this.V=new Xe(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new oo}function oo(){this.i=null,this.g="",this.h=!1}var ao={},rs={};function ss(i,c,u){i.M=1,i.A=Wn(Dt(c)),i.u=u,i.R=!0,co(i,null)}function co(i,c){i.F=Date.now(),Kn(i),i.B=Dt(i.A);var u=i.B,d=i.S;Array.isArray(d)||(d=[String(d)]),wo(u.i,"t",d),i.C=0,u=i.j.L,i.h=new oo,i.g=Bo(i.j,u?c:null,!i.u),i.P>0&&(i.O=new Sl(f(i.Y,i,i.g),i.P)),c=i.V,u=i.g,d=i.ba;var w="readystatechange";Array.isArray(w)||(w&&(Yi[0]=w.toString()),w=Yi);for(let A=0;A<w.length;A++){const C=Gi(u,w[A],d||c.handleEvent,!1,c.h||c);if(!C)break;c.g[C.key]=C}c=i.J?ji(i.J):{},i.u?(i.v||(i.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.B,i.v,i.u,c)):(i.v="GET",i.g.ea(i.B,i.v,null,c)),tn(),Cl(i.i,i.v,i.B,i.l,i.S,i.u)}Gt.prototype.ba=function(i){i=i.target;const c=this.O;c&&Wt(i)==3?c.j():this.Y(i)},Gt.prototype.Y=function(i){try{if(i==this.g)t:{const U=Wt(this.g),st=this.g.ya(),H=this.g.ca();if(!(U<3)&&(U!=3||this.g&&(this.h.h||this.g.la()||Co(this.g)))){this.K||U!=4||st==7||(st==8||H<=0?tn(3):tn(2)),is(this);var c=this.g.ca();this.X=c;var u=Ol(this);if(this.o=c==200,Vl(this.i,this.v,this.B,this.l,this.S,U,c),this.o){if(this.U&&!this.L){e:{if(this.g){var d,w=this.g;if((d=w.g?w.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!g(d)){var A=d;break e}}A=null}if(i=A)De(this.i,this.l,i,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,os(this,i);else{this.o=!1,this.m=3,Et(12),de(this),sn(this);break t}}if(this.R){i=!0;let at;for(;!this.K&&this.C<u.length;)if(at=Ml(this,u),at==rs){U==4&&(this.m=4,Et(14),i=!1),De(this.i,this.l,null,"[Incomplete Response]");break}else if(at==ao){this.m=4,Et(15),De(this.i,this.l,u,"[Invalid Chunk]"),i=!1;break}else De(this.i,this.l,at,null),os(this,at);if(uo(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),U!=4||u.length!=0||this.h.h||(this.m=1,Et(16),i=!1),this.o=this.o&&i,!i)De(this.i,this.l,u,"[Invalid Chunked Response]"),de(this),sn(this);else if(u.length>0&&!this.W){this.W=!0;var C=this.j;C.g==this&&C.aa&&!C.P&&(C.j.info("Great, no buffering proxy detected. Bytes received: "+u.length),ms(C),C.P=!0,Et(11))}}else De(this.i,this.l,u,null),os(this,u);U==4&&de(this),this.o&&!this.K&&(U==4?xo(this.j,this):(this.o=!1,Kn(this)))}else Ql(this.g),c==400&&u.indexOf("Unknown SID")>0?(this.m=3,Et(12)):(this.m=0,Et(13)),de(this),sn(this)}}}catch{}finally{}};function Ol(i){if(!uo(i))return i.g.la();const c=Co(i.g);if(c==="")return"";let u="";const d=c.length,w=Wt(i.g)==4;if(!i.h.i){if(typeof TextDecoder>"u")return de(i),sn(i),"";i.h.i=new a.TextDecoder}for(let A=0;A<d;A++)i.h.h=!0,u+=i.h.i.decode(c[A],{stream:!(w&&A==d-1)});return c.length=0,i.h.g+=u,i.C=0,i.h.g}function uo(i){return i.g?i.v=="GET"&&i.M!=2&&i.j.Aa:!1}function Ml(i,c){var u=i.C,d=c.indexOf(`
`,u);return d==-1?rs:(u=Number(c.substring(u,d)),isNaN(u)?ao:(d+=1,d+u>c.length?rs:(c=c.slice(d,d+u),i.C=d+u,c)))}Gt.prototype.cancel=function(){this.K=!0,de(this)};function Kn(i){i.T=Date.now()+i.H,lo(i,i.H)}function lo(i,c){if(i.D!=null)throw Error("WatchDog timer not null");i.D=en(f(i.aa,i),c)}function is(i){i.D&&(a.clearTimeout(i.D),i.D=null)}Gt.prototype.aa=function(){this.D=null;const i=Date.now();i-this.T>=0?(Dl(this.i,this.B),this.M!=2&&(tn(),Et(17)),de(this),this.m=2,sn(this)):lo(this,this.T-i)};function sn(i){i.j.I==0||i.K||xo(i.j,i)}function de(i){is(i);var c=i.O;c&&typeof c.dispose=="function"&&c.dispose(),i.O=null,Ji(i.V),i.g&&(c=i.g,i.g=null,c.abort(),c.dispose())}function os(i,c){try{var u=i.j;if(u.I!=0&&(u.g==i||as(u.h,i))){if(!i.L&&as(u.h,i)&&u.I==3){try{var d=u.Ba.g.parse(c)}catch{d=null}if(Array.isArray(d)&&d.length==3){var w=d;if(w[0]==0){t:if(!u.v){if(u.g)if(u.g.F+3e3<i.F)Zn(u),Jn(u);else break t;ds(u),Et(18)}}else u.xa=w[1],0<u.xa-u.K&&w[2]<37500&&u.F&&u.A==0&&!u.C&&(u.C=en(f(u.Va,u),6e3));mo(u.h)<=1&&u.ta&&(u.ta=void 0)}else pe(u,11)}else if((i.L||u.g==i)&&Zn(u),!g(c))for(w=u.Ba.g.parse(c),c=0;c<w.length;c++){let H=w[c];const at=H[0];if(!(at<=u.K))if(u.K=at,H=H[1],u.I==2)if(H[0]=="c"){u.M=H[1],u.ba=H[2];const Nt=H[3];Nt!=null&&(u.ka=Nt,u.j.info("VER="+u.ka));const ge=H[4];ge!=null&&(u.za=ge,u.j.info("SVER="+u.za));const Qt=H[5];Qt!=null&&typeof Qt=="number"&&Qt>0&&(d=1.5*Qt,u.O=d,u.j.info("backChannelRequestTimeoutMs_="+d)),d=u;const Yt=i.g;if(Yt){const er=Yt.g?Yt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(er){var A=d.h;A.g||er.indexOf("spdy")==-1&&er.indexOf("quic")==-1&&er.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(cs(A,A.h),A.h=null))}if(d.G){const ps=Yt.g?Yt.g.getResponseHeader("X-HTTP-Session-Id"):null;ps&&(d.wa=ps,Q(d.J,d.G,ps))}}u.I=3,u.l&&u.l.ra(),u.aa&&(u.T=Date.now()-i.F,u.j.info("Handshake RTT: "+u.T+"ms")),d=u;var C=i;if(d.na=Uo(d,d.L?d.ba:null,d.W),C.L){po(d.h,C);var U=C,st=d.O;st&&(U.H=st),U.D&&(is(U),Kn(U)),d.g=C}else Oo(d);u.i.length>0&&Xn(u)}else H[0]!="stop"&&H[0]!="close"||pe(u,7);else u.I==3&&(H[0]=="stop"||H[0]=="close"?H[0]=="stop"?pe(u,7):fs(u):H[0]!="noop"&&u.l&&u.l.qa(H),u.A=0)}}tn(4)}catch{}}var xl=class{constructor(i,c){this.g=i,this.map=c}};function ho(i){this.l=i||10,a.PerformanceNavigationTiming?(i=a.performance.getEntriesByType("navigation"),i=i.length>0&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function fo(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function mo(i){return i.h?1:i.g?i.g.size:0}function as(i,c){return i.h?i.h==c:i.g?i.g.has(c):!1}function cs(i,c){i.g?i.g.add(c):i.h=c}function po(i,c){i.h&&i.h==c?i.h=null:i.g&&i.g.has(c)&&i.g.delete(c)}ho.prototype.cancel=function(){if(this.i=go(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function go(i){if(i.h!=null)return i.i.concat(i.h.G);if(i.g!=null&&i.g.size!==0){let c=i.i;for(const u of i.g.values())c=c.concat(u.G);return c}return P(i.i)}var _o=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ll(i,c){if(i){i=i.split("&");for(let u=0;u<i.length;u++){const d=i[u].indexOf("=");let w,A=null;d>=0?(w=i[u].substring(0,d),A=i[u].substring(d+1)):w=i[u],c(w,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function Ht(i){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;i instanceof Ht?(this.l=i.l,on(this,i.j),this.o=i.o,this.g=i.g,an(this,i.u),this.h=i.h,us(this,vo(i.i)),this.m=i.m):i&&(c=String(i).match(_o))?(this.l=!1,on(this,c[1]||"",!0),this.o=cn(c[2]||""),this.g=cn(c[3]||"",!0),an(this,c[4]),this.h=cn(c[5]||"",!0),us(this,c[6]||"",!0),this.m=cn(c[7]||"")):(this.l=!1,this.i=new ln(null,this.l))}Ht.prototype.toString=function(){const i=[];var c=this.j;c&&i.push(un(c,yo,!0),":");var u=this.g;return(u||c=="file")&&(i.push("//"),(c=this.o)&&i.push(un(c,yo,!0),"@"),i.push(rn(u).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.u,u!=null&&i.push(":",String(u))),(u=this.h)&&(this.g&&u.charAt(0)!="/"&&i.push("/"),i.push(un(u,u.charAt(0)=="/"?Bl:Ul,!0))),(u=this.i.toString())&&i.push("?",u),(u=this.m)&&i.push("#",un(u,jl)),i.join("")},Ht.prototype.resolve=function(i){const c=Dt(this);let u=!!i.j;u?on(c,i.j):u=!!i.o,u?c.o=i.o:u=!!i.g,u?c.g=i.g:u=i.u!=null;var d=i.h;if(u)an(c,i.u);else if(u=!!i.h){if(d.charAt(0)!="/")if(this.g&&!this.h)d="/"+d;else{var w=c.h.lastIndexOf("/");w!=-1&&(d=c.h.slice(0,w+1)+d)}if(w=d,w==".."||w==".")d="";else if(w.indexOf("./")!=-1||w.indexOf("/.")!=-1){d=w.lastIndexOf("/",0)==0,w=w.split("/");const A=[];for(let C=0;C<w.length;){const U=w[C++];U=="."?d&&C==w.length&&A.push(""):U==".."?((A.length>1||A.length==1&&A[0]!="")&&A.pop(),d&&C==w.length&&A.push("")):(A.push(U),d=!0)}d=A.join("/")}else d=w}return u?c.h=d:u=i.i.toString()!=="",u?us(c,vo(i.i)):u=!!i.m,u&&(c.m=i.m),c};function Dt(i){return new Ht(i)}function on(i,c,u){i.j=u?cn(c,!0):c,i.j&&(i.j=i.j.replace(/:$/,""))}function an(i,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);i.u=c}else i.u=null}function us(i,c,u){c instanceof ln?(i.i=c,$l(i.i,i.l)):(u||(c=un(c,ql)),i.i=new ln(c,i.l))}function Q(i,c,u){i.i.set(c,u)}function Wn(i){return Q(i,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),i}function cn(i,c){return i?c?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function un(i,c,u){return typeof i=="string"?(i=encodeURI(i).replace(c,Fl),u&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function Fl(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var yo=/[#\/\?@]/g,Ul=/[#\?:]/g,Bl=/[#\?]/g,ql=/[#\?@]/g,jl=/#/g;function ln(i,c){this.h=this.g=null,this.i=i||null,this.j=!!c}function me(i){i.g||(i.g=new Map,i.h=0,i.i&&Ll(i.i,function(c,u){i.add(decodeURIComponent(c.replace(/\+/g," ")),u)}))}n=ln.prototype,n.add=function(i,c){me(this),this.i=null,i=Ne(this,i);let u=this.g.get(i);return u||this.g.set(i,u=[]),u.push(c),this.h+=1,this};function Eo(i,c){me(i),c=Ne(i,c),i.g.has(c)&&(i.i=null,i.h-=i.g.get(c).length,i.g.delete(c))}function To(i,c){return me(i),c=Ne(i,c),i.g.has(c)}n.forEach=function(i,c){me(this),this.g.forEach(function(u,d){u.forEach(function(w){i.call(c,w,d,this)},this)},this)};function Io(i,c){me(i);let u=[];if(typeof c=="string")To(i,c)&&(u=u.concat(i.g.get(Ne(i,c))));else for(i=Array.from(i.g.values()),c=0;c<i.length;c++)u=u.concat(i[c]);return u}n.set=function(i,c){return me(this),this.i=null,i=Ne(this,i),To(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[c]),this.h+=1,this},n.get=function(i,c){return i?(i=Io(this,i),i.length>0?String(i[0]):c):c};function wo(i,c,u){Eo(i,c),u.length>0&&(i.i=null,i.g.set(Ne(i,c),P(u)),i.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],c=Array.from(this.g.keys());for(let d=0;d<c.length;d++){var u=c[d];const w=rn(u);u=Io(this,u);for(let A=0;A<u.length;A++){let C=w;u[A]!==""&&(C+="="+rn(u[A])),i.push(C)}}return this.i=i.join("&")};function vo(i){const c=new ln;return c.i=i.i,i.g&&(c.g=new Map(i.g),c.h=i.h),c}function Ne(i,c){return c=String(c),i.j&&(c=c.toLowerCase()),c}function $l(i,c){c&&!i.j&&(me(i),i.i=null,i.g.forEach(function(u,d){const w=d.toLowerCase();d!=w&&(Eo(this,d),wo(this,w,u))},i)),i.j=c}function zl(i,c){const u=new nn;if(a.Image){const d=new Image;d.onload=m(Kt,u,"TestLoadImage: loaded",!0,c,d),d.onerror=m(Kt,u,"TestLoadImage: error",!1,c,d),d.onabort=m(Kt,u,"TestLoadImage: abort",!1,c,d),d.ontimeout=m(Kt,u,"TestLoadImage: timeout",!1,c,d),a.setTimeout(function(){d.ontimeout&&d.ontimeout()},1e4),d.src=i}else c(!1)}function Gl(i,c){const u=new nn,d=new AbortController,w=setTimeout(()=>{d.abort(),Kt(u,"TestPingServer: timeout",!1,c)},1e4);fetch(i,{signal:d.signal}).then(A=>{clearTimeout(w),A.ok?Kt(u,"TestPingServer: ok",!0,c):Kt(u,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(w),Kt(u,"TestPingServer: error",!1,c)})}function Kt(i,c,u,d,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),d(u)}catch{}}function Hl(){this.g=new Pl}function ls(i){this.i=i.Sb||null,this.h=i.ab||!1}T(ls,Xi),ls.prototype.g=function(){return new Qn(this.i,this.h)};function Qn(i,c){mt.call(this),this.H=i,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}T(Qn,mt),n=Qn.prototype,n.open=function(i,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=i,this.D=c,this.readyState=1,fn(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};i&&(c.body=i),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,hn(this)),this.readyState=0},n.Pa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,fn(this)),this.g&&(this.readyState=3,fn(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Ao(this)}else i.text().then(this.Oa.bind(this),this.ga.bind(this))};function Ao(i){i.j.read().then(i.Ma.bind(i)).catch(i.ga.bind(i))}n.Ma=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var c=i.value?i.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!i.done}))&&(this.response=this.responseText+=c)}i.done?hn(this):fn(this),this.readyState==3&&Ao(this)}},n.Oa=function(i){this.g&&(this.response=this.responseText=i,hn(this))},n.Na=function(i){this.g&&(this.response=i,hn(this))},n.ga=function(){this.g&&hn(this)};function hn(i){i.readyState=4,i.l=null,i.j=null,i.B=null,fn(i)}n.setRequestHeader=function(i,c){this.A.append(i,c)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],c=this.h.entries();for(var u=c.next();!u.done;)u=u.value,i.push(u[0]+": "+u[1]),u=c.next();return i.join(`\r
`)};function fn(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Qn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Ro(i){let c="";return jn(i,function(u,d){c+=d,c+=":",c+=u,c+=`\r
`}),c}function hs(i,c,u){t:{for(d in u){var d=!1;break t}d=!0}d||(u=Ro(u),typeof i=="string"?u!=null&&rn(u):Q(i,c,u))}function Z(i){mt.call(this),this.headers=new Map,this.L=i||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}T(Z,mt);var Kl=/^https?$/i,Wl=["POST","PUT"];n=Z.prototype,n.Fa=function(i){this.H=i},n.ea=function(i,c,u,d){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);c=c?c.toUpperCase():"GET",this.D=i,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():io.g(),this.g.onreadystatechange=R(f(this.Ca,this));try{this.B=!0,this.g.open(c,String(i),!0),this.B=!1}catch(A){So(this,A);return}if(i=u||"",u=new Map(this.headers),d)if(Object.getPrototypeOf(d)===Object.prototype)for(var w in d)u.set(w,d[w]);else if(typeof d.keys=="function"&&typeof d.get=="function")for(const A of d.keys())u.set(A,d.get(A));else throw Error("Unknown input type for opt_headers: "+String(d));d=Array.from(u.keys()).find(A=>A.toLowerCase()=="content-type"),w=a.FormData&&i instanceof a.FormData,!(Array.prototype.indexOf.call(Wl,c,void 0)>=0)||d||w||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,C]of u)this.g.setRequestHeader(A,C);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(i),this.v=!1}catch(A){So(this,A)}};function So(i,c){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=c,i.o=5,bo(i),Yn(i)}function bo(i){i.A||(i.A=!0,yt(i,"complete"),yt(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=i||7,yt(this,"complete"),yt(this,"abort"),Yn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Yn(this,!0)),Z.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Po(this):this.Xa())},n.Xa=function(){Po(this)};function Po(i){if(i.h&&typeof o<"u"){if(i.v&&Wt(i)==4)setTimeout(i.Ca.bind(i),0);else if(yt(i,"readystatechange"),Wt(i)==4){i.h=!1;try{const A=i.ca();t:switch(A){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break t;default:c=!1}var u;if(!(u=c)){var d;if(d=A===0){let C=String(i.D).match(_o)[1]||null;!C&&a.self&&a.self.location&&(C=a.self.location.protocol.slice(0,-1)),d=!Kl.test(C?C.toLowerCase():"")}u=d}if(u)yt(i,"complete"),yt(i,"success");else{i.o=6;try{var w=Wt(i)>2?i.g.statusText:""}catch{w=""}i.l=w+" ["+i.ca()+"]",bo(i)}}finally{Yn(i)}}}}function Yn(i,c){if(i.g){i.m&&(clearTimeout(i.m),i.m=null);const u=i.g;i.g=null,c||yt(i,"ready");try{u.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Wt(i){return i.g?i.g.readyState:0}n.ca=function(){try{return Wt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(i){if(this.g){var c=this.g.responseText;return i&&c.indexOf(i)==0&&(c=c.substring(i.length)),bl(c)}};function Co(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.F){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function Ql(i){const c={};i=(i.g&&Wt(i)>=2&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let d=0;d<i.length;d++){if(g(i[d]))continue;var u=kl(i[d]);const w=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const A=c[w]||[];c[w]=A,A.push(u)}Il(c,function(d){return d.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function dn(i,c,u){return u&&u.internalChannelParams&&u.internalChannelParams[i]||c}function Vo(i){this.za=0,this.i=[],this.j=new nn,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=dn("failFast",!1,i),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=dn("baseRetryDelayMs",5e3,i),this.Za=dn("retryDelaySeedMs",1e4,i),this.Ta=dn("forwardChannelMaxRetries",2,i),this.va=dn("forwardChannelRequestTimeoutMs",2e4,i),this.ma=i&&i.xmlHttpFactory||void 0,this.Ua=i&&i.Rb||void 0,this.Aa=i&&i.useFetchStreams||!1,this.O=void 0,this.L=i&&i.supportsCrossDomainXhr||!1,this.M="",this.h=new ho(i&&i.concurrentRequestLimit),this.Ba=new Hl,this.S=i&&i.fastHandshake||!1,this.R=i&&i.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=i&&i.Pb||!1,i&&i.ua&&this.j.ua(),i&&i.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&i&&i.detectBufferingProxy||!1,this.ia=void 0,i&&i.longPollingTimeout&&i.longPollingTimeout>0&&(this.ia=i.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Vo.prototype,n.ka=8,n.I=1,n.connect=function(i,c,u,d){Et(0),this.W=i,this.H=c||{},u&&d!==void 0&&(this.H.OSID=u,this.H.OAID=d),this.F=this.X,this.J=Uo(this,null,this.W),Xn(this)};function fs(i){if(Do(i),i.I==3){var c=i.V++,u=Dt(i.J);if(Q(u,"SID",i.M),Q(u,"RID",c),Q(u,"TYPE","terminate"),mn(i,u),c=new Gt(i,i.j,c),c.M=2,c.A=Wn(Dt(u)),u=!1,a.navigator&&a.navigator.sendBeacon)try{u=a.navigator.sendBeacon(c.A.toString(),"")}catch{}!u&&a.Image&&(new Image().src=c.A,u=!0),u||(c.g=Bo(c.j,null),c.g.ea(c.A)),c.F=Date.now(),Kn(c)}Fo(i)}function Jn(i){i.g&&(ms(i),i.g.cancel(),i.g=null)}function Do(i){Jn(i),i.v&&(a.clearTimeout(i.v),i.v=null),Zn(i),i.h.cancel(),i.m&&(typeof i.m=="number"&&a.clearTimeout(i.m),i.m=null)}function Xn(i){if(!fo(i.h)&&!i.m){i.m=!0;var c=i.Ea;ft||p(),dt||(ft(),dt=!0),E.add(c,i),i.D=0}}function Yl(i,c){return mo(i.h)>=i.h.j-(i.m?1:0)?!1:i.m?(i.i=c.G.concat(i.i),!0):i.I==1||i.I==2||i.D>=(i.Sa?0:i.Ta)?!1:(i.m=en(f(i.Ea,i,c),Lo(i,i.D)),i.D++,!0)}n.Ea=function(i){if(this.m)if(this.m=null,this.I==1){if(!i){this.V=Math.floor(Math.random()*1e5),i=this.V++;const w=new Gt(this,this.j,i);let A=this.o;if(this.U&&(A?(A=ji(A),zi(A,this.U)):A=this.U),this.u!==null||this.R||(w.J=A,A=null),this.S)t:{for(var c=0,u=0;u<this.i.length;u++){e:{var d=this.i[u];if("__data__"in d.map&&(d=d.map.__data__,typeof d=="string")){d=d.length;break e}d=void 0}if(d===void 0)break;if(c+=d,c>4096){c=u;break t}if(c===4096||u===this.i.length-1){c=u+1;break t}}c=1e3}else c=1e3;c=ko(this,w,c),u=Dt(this.J),Q(u,"RID",i),Q(u,"CVER",22),this.G&&Q(u,"X-HTTP-Session-Id",this.G),mn(this,u),A&&(this.R?c="headers="+rn(Ro(A))+"&"+c:this.u&&hs(u,this.u,A)),cs(this.h,w),this.Ra&&Q(u,"TYPE","init"),this.S?(Q(u,"$req",c),Q(u,"SID","null"),w.U=!0,ss(w,u,null)):ss(w,u,c),this.I=2}}else this.I==3&&(i?No(this,i):this.i.length==0||fo(this.h)||No(this))};function No(i,c){var u;c?u=c.l:u=i.V++;const d=Dt(i.J);Q(d,"SID",i.M),Q(d,"RID",u),Q(d,"AID",i.K),mn(i,d),i.u&&i.o&&hs(d,i.u,i.o),u=new Gt(i,i.j,u,i.D+1),i.u===null&&(u.J=i.o),c&&(i.i=c.G.concat(i.i)),c=ko(i,u,1e3),u.H=Math.round(i.va*.5)+Math.round(i.va*.5*Math.random()),cs(i.h,u),ss(u,d,c)}function mn(i,c){i.H&&jn(i.H,function(u,d){Q(c,d,u)}),i.l&&jn({},function(u,d){Q(c,d,u)})}function ko(i,c,u){u=Math.min(i.i.length,u);const d=i.l?f(i.l.Ka,i.l,i):null;t:{var w=i.i;let U=-1;for(;;){const st=["count="+u];U==-1?u>0?(U=w[0].g,st.push("ofs="+U)):U=0:st.push("ofs="+U);let H=!0;for(let at=0;at<u;at++){var A=w[at].g;const Nt=w[at].map;if(A-=U,A<0)U=Math.max(0,w[at].g-100),H=!1;else try{A="req"+A+"_"||"";try{var C=Nt instanceof Map?Nt:Object.entries(Nt);for(const[ge,Qt]of C){let Yt=Qt;l(Qt)&&(Yt=Zr(Qt)),st.push(A+ge+"="+encodeURIComponent(Yt))}}catch(ge){throw st.push(A+"type="+encodeURIComponent("_badmap")),ge}}catch{d&&d(Nt)}}if(H){C=st.join("&");break t}}C=void 0}return i=i.i.splice(0,u),c.G=i,C}function Oo(i){if(!i.g&&!i.v){i.Y=1;var c=i.Da;ft||p(),dt||(ft(),dt=!0),E.add(c,i),i.A=0}}function ds(i){return i.g||i.v||i.A>=3?!1:(i.Y++,i.v=en(f(i.Da,i),Lo(i,i.A)),i.A++,!0)}n.Da=function(){if(this.v=null,Mo(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var i=4*this.T;this.j.info("BP detection timer enabled: "+i),this.B=en(f(this.Wa,this),i)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,Et(10),Jn(this),Mo(this))};function ms(i){i.B!=null&&(a.clearTimeout(i.B),i.B=null)}function Mo(i){i.g=new Gt(i,i.j,"rpc",i.Y),i.u===null&&(i.g.J=i.o),i.g.P=0;var c=Dt(i.na);Q(c,"RID","rpc"),Q(c,"SID",i.M),Q(c,"AID",i.K),Q(c,"CI",i.F?"0":"1"),!i.F&&i.ia&&Q(c,"TO",i.ia),Q(c,"TYPE","xmlhttp"),mn(i,c),i.u&&i.o&&hs(c,i.u,i.o),i.O&&(i.g.H=i.O);var u=i.g;i=i.ba,u.M=1,u.A=Wn(Dt(c)),u.u=null,u.R=!0,co(u,i)}n.Va=function(){this.C!=null&&(this.C=null,Jn(this),ds(this),Et(19))};function Zn(i){i.C!=null&&(a.clearTimeout(i.C),i.C=null)}function xo(i,c){var u=null;if(i.g==c){Zn(i),ms(i),i.g=null;var d=2}else if(as(i.h,c))u=c.G,po(i.h,c),d=1;else return;if(i.I!=0){if(c.o)if(d==1){u=c.u?c.u.length:0,c=Date.now()-c.F;var w=i.D;d=Gn(),yt(d,new ro(d,u)),Xn(i)}else Oo(i);else if(w=c.m,w==3||w==0&&c.X>0||!(d==1&&Yl(i,c)||d==2&&ds(i)))switch(u&&u.length>0&&(c=i.h,c.i=c.i.concat(u)),w){case 1:pe(i,5);break;case 4:pe(i,10);break;case 3:pe(i,6);break;default:pe(i,2)}}}function Lo(i,c){let u=i.Qa+Math.floor(Math.random()*i.Za);return i.isActive()||(u*=2),u*c}function pe(i,c){if(i.j.info("Error code "+c),c==2){var u=f(i.bb,i),d=i.Ua;const w=!d;d=new Ht(d||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||on(d,"https"),Wn(d),w?zl(d.toString(),u):Gl(d.toString(),u)}else Et(2);i.I=0,i.l&&i.l.pa(c),Fo(i),Do(i)}n.bb=function(i){i?(this.j.info("Successfully pinged google.com"),Et(2)):(this.j.info("Failed to ping google.com"),Et(1))};function Fo(i){if(i.I=0,i.ja=[],i.l){const c=go(i.h);(c.length!=0||i.i.length!=0)&&(N(i.ja,c),N(i.ja,i.i),i.h.i.length=0,P(i.i),i.i.length=0),i.l.oa()}}function Uo(i,c,u){var d=u instanceof Ht?Dt(u):new Ht(u);if(d.g!="")c&&(d.g=c+"."+d.g),an(d,d.u);else{var w=a.location;d=w.protocol,c=c?c+"."+w.hostname:w.hostname,w=+w.port;const A=new Ht(null);d&&on(A,d),c&&(A.g=c),w&&an(A,w),u&&(A.h=u),d=A}return u=i.G,c=i.wa,u&&c&&Q(d,u,c),Q(d,"VER",i.ka),mn(i,d),d}function Bo(i,c,u){if(c&&!i.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=i.Aa&&!i.ma?new Z(new ls({ab:u})):new Z(i.ma),c.Fa(i.L),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function qo(){}n=qo.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function tr(){}tr.prototype.g=function(i,c){return new vt(i,c)};function vt(i,c){mt.call(this),this.g=new Vo(c),this.l=i,this.h=c&&c.messageUrlParams||null,i=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(i?i["X-WebChannel-Content-Type"]=c.messageContentType:i={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(i?i["X-WebChannel-Client-Profile"]=c.sa:i={"X-WebChannel-Client-Profile":c.sa}),this.g.U=i,(i=c&&c.Qb)&&!g(i)&&(this.g.u=i),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!g(c)&&(this.g.G=c,i=this.h,i!==null&&c in i&&(i=this.h,c in i&&delete i[c])),this.j=new ke(this)}T(vt,mt),vt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},vt.prototype.close=function(){fs(this.g)},vt.prototype.o=function(i){var c=this.g;if(typeof i=="string"){var u={};u.__data__=i,i=u}else this.v&&(u={},u.__data__=Zr(i),i=u);c.i.push(new xl(c.Ya++,i)),c.I==3&&Xn(c)},vt.prototype.N=function(){this.g.l=null,delete this.j,fs(this.g),delete this.g,vt.Z.N.call(this)};function jo(i){ts.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var c=i.__sm__;if(c){t:{for(const u in c){i=u;break t}i=void 0}(this.i=i)&&(i=this.i,c=c!==null&&i in c?c[i]:void 0),this.data=c}else this.data=i}T(jo,ts);function $o(){es.call(this),this.status=1}T($o,es);function ke(i){this.g=i}T(ke,qo),ke.prototype.ra=function(){yt(this.g,"a")},ke.prototype.qa=function(i){yt(this.g,new jo(i))},ke.prototype.pa=function(i){yt(this.g,new $o)},ke.prototype.oa=function(){yt(this.g,"b")},tr.prototype.createWebChannel=tr.prototype.g,vt.prototype.send=vt.prototype.o,vt.prototype.open=vt.prototype.m,vt.prototype.close=vt.prototype.close,Wc=function(){return new tr},Kc=function(){return Gn()},Hc=fe,Os={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Hn.NO_ERROR=0,Hn.TIMEOUT=8,Hn.HTTP_ERROR=6,ar=Hn,so.COMPLETE="complete",Gc=so,Zi.EventType=Ze,Ze.OPEN="a",Ze.CLOSE="b",Ze.ERROR="c",Ze.MESSAGE="d",mt.prototype.listen=mt.prototype.J,gn=Zi,Z.prototype.listenOnce=Z.prototype.K,Z.prototype.getLastError=Z.prototype.Ha,Z.prototype.getLastErrorCode=Z.prototype.ya,Z.prototype.getStatus=Z.prototype.ca,Z.prototype.getResponseJson=Z.prototype.La,Z.prototype.getResponseText=Z.prototype.la,Z.prototype.send=Z.prototype.ea,Z.prototype.setWithCredentials=Z.prototype.Fa,zc=Z}).apply(typeof nr<"u"?nr:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}gt.UNAUTHENTICATED=new gt(null),gt.GOOGLE_CREDENTIALS=new gt("google-credentials-uid"),gt.FIRST_PARTY=new gt("first-party-uid"),gt.MOCK_USER=new gt("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ke="12.11.0";function tm(n){Ke=n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ae=new Zs("@firebase/firestore");function Oe(){return Ae.logLevel}function D(n,...t){if(Ae.logLevel<=$.DEBUG){const e=t.map(ai);Ae.debug(`Firestore (${Ke}): ${n}`,...e)}}function $t(n,...t){if(Ae.logLevel<=$.ERROR){const e=t.map(ai);Ae.error(`Firestore (${Ke}): ${n}`,...e)}}function Re(n,...t){if(Ae.logLevel<=$.WARN){const e=t.map(ai);Ae.warn(`Firestore (${Ke}): ${n}`,...e)}}function ai(n){if(typeof n=="string")return n;try{return(function(e){return JSON.stringify(e)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function x(n,t,e){let r="Unexpected state";typeof t=="string"?r=t:e=t,Qc(n,r,e)}function Qc(n,t,e){let r=`FIRESTORE (${Ke}) INTERNAL ASSERTION FAILED: ${t} (ID: ${n.toString(16)})`;if(e!==void 0)try{r+=" CONTEXT: "+JSON.stringify(e)}catch{r+=" CONTEXT: "+e}throw $t(r),new Error(r)}function z(n,t,e,r){let s="Unexpected state";typeof e=="string"?s=e:r=e,n||Qc(t,s,r)}function F(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class V extends ue{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yc{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class em{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable((()=>e(gt.UNAUTHENTICATED)))}shutdown(){}}class nm{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable((()=>e(this.token.user)))}shutdown(){this.changeListener=null}}class rm{constructor(t){this.t=t,this.currentUser=gt.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){z(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,e(h)):Promise.resolve();let o=new Te;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new Te,t.enqueueRetryable((()=>s(this.currentUser)))};const a=()=>{const h=o;t.enqueueRetryable((async()=>{await h.promise,await s(this.currentUser)}))},l=h=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit((h=>l(h))),setTimeout((()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?l(h):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new Te)}}),0),a()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then((r=>this.i!==t?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(z(typeof r.accessToken=="string",31837,{l:r}),new Yc(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return z(t===null||typeof t=="string",2055,{h:t}),new gt(t)}}class sm{constructor(t,e,r){this.P=t,this.T=e,this.I=r,this.type="FirstParty",this.user=gt.FIRST_PARTY,this.R=new Map}A(){return this.I?this.I():null}get headers(){this.R.set("X-Goog-AuthUser",this.P);const t=this.A();return t&&this.R.set("Authorization",t),this.T&&this.R.set("X-Goog-Iam-Authorization-Token",this.T),this.R}}class im{constructor(t,e,r){this.P=t,this.T=e,this.I=r}getToken(){return Promise.resolve(new sm(this.P,this.T,this.I))}start(t,e){t.enqueueRetryable((()=>e(gt.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class la{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class om{constructor(t,e){this.V=e,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,_f(t)&&t.settings.appCheckToken&&(this.p=t.settings.appCheckToken)}start(t,e){z(this.o===void 0,3512);const r=o=>{o.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,D("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable((()=>r(o)))};const s=o=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((o=>s(o))),setTimeout((()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new la(this.p));const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then((e=>e?(z(typeof e.token=="string",44558,{tokenResult:e}),this.m=e.token,new la(e.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function am(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=am(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<e&&(r+=t.charAt(s[o]%62))}return r}}function B(n,t){return n<t?-1:n>t?1:0}function Ms(n,t){const e=Math.min(n.length,t.length);for(let r=0;r<e;r++){const s=n.charAt(r),o=t.charAt(r);if(s!==o)return vs(s)===vs(o)?B(s,o):vs(s)?1:-1}return B(n.length,t.length)}const cm=55296,um=57343;function vs(n){const t=n.charCodeAt(0);return t>=cm&&t<=um}function je(n,t,e){return n.length===t.length&&n.every(((r,s)=>e(r,t[s])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ha="__name__";class kt{constructor(t,e,r){e===void 0?e=0:e>t.length&&x(637,{offset:e,range:t.length}),r===void 0?r=t.length-e:r>t.length-e&&x(1746,{length:r,range:t.length-e}),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return kt.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof kt?t.forEach((r=>{e.push(r)})):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const o=kt.compareSegments(t.get(s),e.get(s));if(o!==0)return o}return B(t.length,e.length)}static compareSegments(t,e){const r=kt.isNumericId(t),s=kt.isNumericId(e);return r&&!s?-1:!r&&s?1:r&&s?kt.extractNumericId(t).compare(kt.extractNumericId(e)):Ms(t,e)}static isNumericId(t){return t.startsWith("__id")&&t.endsWith("__")}static extractNumericId(t){return te.fromString(t.substring(4,t.length-2))}}class W extends kt{construct(t,e,r){return new W(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new V(S.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter((s=>s.length>0)))}return new W(e)}static emptyPath(){return new W([])}}const lm=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class lt extends kt{construct(t,e,r){return new lt(t,e,r)}static isValidIdentifier(t){return lm.test(t)}canonicalString(){return this.toArray().map((t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),lt.isValidIdentifier(t)||(t="`"+t+"`"),t))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ha}static keyField(){return new lt([ha])}static fromServerFormat(t){const e=[];let r="",s=0;const o=()=>{if(r.length===0)throw new V(S.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let a=!1;for(;s<t.length;){const l=t[s];if(l==="\\"){if(s+1===t.length)throw new V(S.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const h=t[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new V(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=h,s+=2}else l==="`"?(a=!a,s++):l!=="."||a?(r+=l,s++):(o(),s++)}if(o(),a)throw new V(S.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new lt(e)}static emptyPath(){return new lt([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(t){this.path=t}static fromPath(t){return new O(W.fromString(t))}static fromName(t){return new O(W.fromString(t).popFirst(5))}static empty(){return new O(W.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&W.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return W.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new O(new W(t.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jc(n,t,e){if(!e)throw new V(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function hm(n,t,e,r){if(t===!0&&r===!0)throw new V(S.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function fa(n){if(!O.isDocumentKey(n))throw new V(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function da(n){if(O.isDocumentKey(n))throw new V(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Xc(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Nr(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=(function(r){return r.constructor?r.constructor.name:null})(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":x(12329,{type:typeof n})}function Tn(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new V(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Nr(n);throw new V(S.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rt(n,t){const e={typeString:n};return t&&(e.value=t),e}function xn(n,t){if(!Xc(n))throw new V(S.INVALID_ARGUMENT,"JSON must be an object");let e;for(const r in t)if(t[r]){const s=t[r].typeString,o="value"in t[r]?{value:t[r].value}:void 0;if(!(r in n)){e=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){e=`JSON field '${r}' must be a ${s}.`;break}if(o!==void 0&&a!==o.value){e=`Expected '${r}' field to equal '${o.value}'`;break}}if(e)throw new V(S.INVALID_ARGUMENT,e);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ma=-62135596800,pa=1e6;class Y{static now(){return Y.fromMillis(Date.now())}static fromDate(t){return Y.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor((t-1e3*e)*pa);return new Y(e,r)}constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new V(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new V(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<ma)throw new V(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new V(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/pa}_compareTo(t){return this.seconds===t.seconds?B(this.nanoseconds,t.nanoseconds):B(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Y._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(t){if(xn(t,Y._jsonSchema))return new Y(t.seconds,t.nanoseconds)}valueOf(){const t=this.seconds-ma;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Y._jsonSchemaVersion="firestore/timestamp/1.0",Y._jsonSchema={type:rt("string",Y._jsonSchemaVersion),seconds:rt("number"),nanoseconds:rt("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{static fromTimestamp(t){return new L(t)}static min(){return new L(new Y(0,0))}static max(){return new L(new Y(253402300799,999999999))}constructor(t){this.timestamp=t}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bn=-1;function fm(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=L.fromTimestamp(r===1e9?new Y(e+1,0):new Y(e,r));return new re(s,O.empty(),t)}function dm(n){return new re(n.readTime,n.key,bn)}class re{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new re(L.min(),O.empty(),bn)}static max(){return new re(L.max(),O.empty(),bn)}}function mm(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=O.comparator(n.documentKey,t.documentKey),e!==0?e:B(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pm="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class gm{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((t=>t()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function We(n){if(n.code!==S.FAILED_PRECONDITION||n.message!==pm)throw n;D("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class b{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t((e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)}),(e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)}))}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&x(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new b(((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(e,o).next(r,s)}}))}toPromise(){return new Promise(((t,e)=>{this.next(t,e)}))}wrapUserFunction(t){try{const e=t();return e instanceof b?e:b.resolve(e)}catch(e){return b.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction((()=>t(e))):b.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction((()=>t(e))):b.reject(e)}static resolve(t){return new b(((e,r)=>{e(t)}))}static reject(t){return new b(((e,r)=>{r(t)}))}static waitFor(t){return new b(((e,r)=>{let s=0,o=0,a=!1;t.forEach((l=>{++s,l.next((()=>{++o,a&&o===s&&e()}),(h=>r(h)))})),a=!0,o===s&&e()}))}static or(t){let e=b.resolve(!1);for(const r of t)e=e.next((s=>s?b.resolve(s):r()));return e}static forEach(t,e){const r=[];return t.forEach(((s,o)=>{r.push(e.call(this,s,o))})),this.waitFor(r)}static mapArray(t,e){return new b(((r,s)=>{const o=t.length,a=new Array(o);let l=0;for(let h=0;h<o;h++){const f=h;e(t[f]).next((m=>{a[f]=m,++l,l===o&&r(a)}),(m=>s(m)))}}))}static doWhile(t,e){return new b(((r,s)=>{const o=()=>{t()===!0?e().next((()=>{o()}),s):r()};o()}))}}function _m(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function Qe(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>e.writeSequenceNumber(r))}ae(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.ue&&this.ue(t),t}}kr.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ui=-1;function Or(n){return n==null}function _r(n){return n===0&&1/n==-1/0}function ym(n){return typeof n=="number"&&Number.isInteger(n)&&!_r(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zc="";function Em(n){let t="";for(let e=0;e<n.length;e++)t.length>0&&(t=ga(t)),t=Tm(n.get(e),t);return ga(t)}function Tm(n,t){let e=t;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":e+="";break;case Zc:e+="";break;default:e+=o}}return e}function ga(n){return n+Zc+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _a(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function be(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function tu(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J{constructor(t,e){this.comparator=t,this.root=e||ut.EMPTY}insert(t,e){return new J(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ut.BLACK,null,null))}remove(t){return new J(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ut.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal(((e,r)=>(t(e,r),!1)))}toString(){const t=[];return this.inorderTraversal(((e,r)=>(t.push(`${e}:${r}`),!1))),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new rr(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new rr(this.root,t,this.comparator,!1)}getReverseIterator(){return new rr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new rr(this.root,t,this.comparator,!0)}}class rr{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?r(t.key,e):1,e&&s&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ut{constructor(t,e,r,s,o){this.key=t,this.value=e,this.color=r??ut.RED,this.left=s??ut.EMPTY,this.right=o??ut.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,o){return new ut(t??this.key,e??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const o=r(t,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(t,e,r),null):o===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return ut.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return ut.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ut.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ut.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw x(43730,{key:this.key,value:this.value});if(this.right.isRed())throw x(14113,{key:this.key,value:this.value});const t=this.left.check();if(t!==this.right.check())throw x(27949);return t+(this.isRed()?0:1)}}ut.EMPTY=null,ut.RED=!0,ut.BLACK=!1;ut.EMPTY=new class{constructor(){this.size=0}get key(){throw x(57766)}get value(){throw x(16141)}get color(){throw x(16727)}get left(){throw x(29726)}get right(){throw x(36894)}copy(t,e,r,s,o){return this}insert(t,e,r){return new ut(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(t){this.comparator=t,this.data=new J(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal(((e,r)=>(t(e),!1)))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new ya(this.data.getIterator())}getIteratorFrom(t){return new ya(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach((r=>{e=e.add(r)})),e}isEqual(t){if(!(t instanceof ot)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach((e=>{t.push(e)})),t}toString(){const t=[];return this.forEach((e=>t.push(e))),"SortedSet("+t.toString()+")"}copy(t){const e=new ot(this.comparator);return e.data=t,e}}class ya{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(t){this.fields=t,t.sort(lt.comparator)}static empty(){return new Pt([])}unionWith(t){let e=new ot(lt.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new Pt(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return je(this.fields,t.fields,((e,r)=>e.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eu extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(t){this.binaryString=t}static fromBase64String(t){const e=(function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new eu("Invalid base64 string: "+o):o}})(t);return new ht(e)}static fromUint8Array(t){const e=(function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o})(t);return new ht(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(e){return btoa(e)})(this.binaryString)}toUint8Array(){return(function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return B(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}ht.EMPTY_BYTE_STRING=new ht("");const Im=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function se(n){if(z(!!n,39018),typeof n=="string"){let t=0;const e=Im.exec(n);if(z(!!e,46558,{timestamp:n}),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:tt(n.seconds),nanos:tt(n.nanos)}}function tt(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function ie(n){return typeof n=="string"?ht.fromBase64String(n):ht.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nu="server_timestamp",ru="__type__",su="__previous_value__",iu="__local_write_time__";function li(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[ru])==null?void 0:r.stringValue)===nu}function Mr(n){const t=n.mapValue.fields[su];return li(t)?Mr(t):t}function Pn(n){const t=se(n.mapValue.fields[iu].timestampValue);return new Y(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wm{constructor(t,e,r,s,o,a,l,h,f,m,T){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=l,this.longPollingOptions=h,this.useFetchStreams=f,this.isUsingEmulator=m,this.apiKey=T}}const yr="(default)";class Cn{constructor(t,e){this.projectId=t,this.database=e||yr}static empty(){return new Cn("","")}get isDefaultDatabase(){return this.database===yr}isEqual(t){return t instanceof Cn&&t.projectId===this.projectId&&t.database===this.database}}function vm(n,t){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new V(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Cn(n.options.projectId,t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ou="__type__",Am="__max__",sr={mapValue:{}},au="__vector__",Er="value";function oe(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?li(n)?4:Sm(n)?9007199254740991:Rm(n)?10:11:x(28295,{value:n})}function Ut(n,t){if(n===t)return!0;const e=oe(n);if(e!==oe(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Pn(n).isEqual(Pn(t));case 3:return(function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=se(s.timestampValue),l=se(o.timestampValue);return a.seconds===l.seconds&&a.nanos===l.nanos})(n,t);case 5:return n.stringValue===t.stringValue;case 6:return(function(s,o){return ie(s.bytesValue).isEqual(ie(o.bytesValue))})(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return(function(s,o){return tt(s.geoPointValue.latitude)===tt(o.geoPointValue.latitude)&&tt(s.geoPointValue.longitude)===tt(o.geoPointValue.longitude)})(n,t);case 2:return(function(s,o){if("integerValue"in s&&"integerValue"in o)return tt(s.integerValue)===tt(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=tt(s.doubleValue),l=tt(o.doubleValue);return a===l?_r(a)===_r(l):isNaN(a)&&isNaN(l)}return!1})(n,t);case 9:return je(n.arrayValue.values||[],t.arrayValue.values||[],Ut);case 10:case 11:return(function(s,o){const a=s.mapValue.fields||{},l=o.mapValue.fields||{};if(_a(a)!==_a(l))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(l[h]===void 0||!Ut(a[h],l[h])))return!1;return!0})(n,t);default:return x(52216,{left:n})}}function Vn(n,t){return(n.values||[]).find((e=>Ut(e,t)))!==void 0}function $e(n,t){if(n===t)return 0;const e=oe(n),r=oe(t);if(e!==r)return B(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return B(n.booleanValue,t.booleanValue);case 2:return(function(o,a){const l=tt(o.integerValue||o.doubleValue),h=tt(a.integerValue||a.doubleValue);return l<h?-1:l>h?1:l===h?0:isNaN(l)?isNaN(h)?0:-1:1})(n,t);case 3:return Ea(n.timestampValue,t.timestampValue);case 4:return Ea(Pn(n),Pn(t));case 5:return Ms(n.stringValue,t.stringValue);case 6:return(function(o,a){const l=ie(o),h=ie(a);return l.compareTo(h)})(n.bytesValue,t.bytesValue);case 7:return(function(o,a){const l=o.split("/"),h=a.split("/");for(let f=0;f<l.length&&f<h.length;f++){const m=B(l[f],h[f]);if(m!==0)return m}return B(l.length,h.length)})(n.referenceValue,t.referenceValue);case 8:return(function(o,a){const l=B(tt(o.latitude),tt(a.latitude));return l!==0?l:B(tt(o.longitude),tt(a.longitude))})(n.geoPointValue,t.geoPointValue);case 9:return Ta(n.arrayValue,t.arrayValue);case 10:return(function(o,a){var R,P,N,M;const l=o.fields||{},h=a.fields||{},f=(R=l[Er])==null?void 0:R.arrayValue,m=(P=h[Er])==null?void 0:P.arrayValue,T=B(((N=f==null?void 0:f.values)==null?void 0:N.length)||0,((M=m==null?void 0:m.values)==null?void 0:M.length)||0);return T!==0?T:Ta(f,m)})(n.mapValue,t.mapValue);case 11:return(function(o,a){if(o===sr.mapValue&&a===sr.mapValue)return 0;if(o===sr.mapValue)return 1;if(a===sr.mapValue)return-1;const l=o.fields||{},h=Object.keys(l),f=a.fields||{},m=Object.keys(f);h.sort(),m.sort();for(let T=0;T<h.length&&T<m.length;++T){const R=Ms(h[T],m[T]);if(R!==0)return R;const P=$e(l[h[T]],f[m[T]]);if(P!==0)return P}return B(h.length,m.length)})(n.mapValue,t.mapValue);default:throw x(23264,{he:e})}}function Ea(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return B(n,t);const e=se(n),r=se(t),s=B(e.seconds,r.seconds);return s!==0?s:B(e.nanos,r.nanos)}function Ta(n,t){const e=n.values||[],r=t.values||[];for(let s=0;s<e.length&&s<r.length;++s){const o=$e(e[s],r[s]);if(o)return o}return B(e.length,r.length)}function ze(n){return xs(n)}function xs(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(e){const r=se(e);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(e){return ie(e).toBase64()})(n.bytesValue):"referenceValue"in n?(function(e){return O.fromName(e).toString()})(n.referenceValue):"geoPointValue"in n?(function(e){return`geo(${e.latitude},${e.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(e){let r="[",s=!0;for(const o of e.values||[])s?s=!1:r+=",",r+=xs(o);return r+"]"})(n.arrayValue):"mapValue"in n?(function(e){const r=Object.keys(e.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${xs(e.fields[a])}`;return s+"}"})(n.mapValue):x(61005,{value:n})}function cr(n){switch(oe(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const t=Mr(n);return t?16+cr(t):16;case 5:return 2*n.stringValue.length;case 6:return ie(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,o)=>s+cr(o)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return be(r.fields,((o,a)=>{s+=o.length+cr(a)})),s})(n.mapValue);default:throw x(13486,{value:n})}}function Ia(n,t){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${t.path.canonicalString()}`}}function Ls(n){return!!n&&"integerValue"in n}function hi(n){return!!n&&"arrayValue"in n}function wa(n){return!!n&&"nullValue"in n}function va(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ur(n){return!!n&&"mapValue"in n}function Rm(n){var e,r;return((r=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[ou])==null?void 0:r.stringValue)===au}function In(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const t={mapValue:{fields:{}}};return be(n.mapValue.fields,((e,r)=>t.mapValue.fields[e]=In(r))),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=In(n.arrayValue.values[e]);return t}return{...n}}function Sm(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Am}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(t){this.value=t}static empty(){return new St({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!ur(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=In(e)}setAll(t){let e=lt.emptyPath(),r={},s=[];t.forEach(((a,l)=>{if(!e.isImmediateParentOf(l)){const h=this.getFieldsMap(e);this.applyChanges(h,r,s),r={},s=[],e=l.popLast()}a?r[l.lastSegment()]=In(a):s.push(l.lastSegment())}));const o=this.getFieldsMap(e);this.applyChanges(o,r,s)}delete(t){const e=this.field(t.popLast());ur(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Ut(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];ur(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){be(e,((s,o)=>t[s]=o));for(const s of r)delete t[s]}clone(){return new St(In(this.value))}}function cu(n){const t=[];return be(n.fields,((e,r)=>{const s=new lt([e]);if(ur(r)){const o=cu(r.mapValue).fields;if(o.length===0)t.push(s);else for(const a of o)t.push(s.child(a))}else t.push(s)})),new Pt(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(t,e,r,s,o,a,l){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=l}static newInvalidDocument(t){return new _t(t,0,L.min(),L.min(),L.min(),St.empty(),0)}static newFoundDocument(t,e,r,s){return new _t(t,1,e,L.min(),r,s,0)}static newNoDocument(t,e){return new _t(t,2,e,L.min(),L.min(),St.empty(),0)}static newUnknownDocument(t,e){return new _t(t,3,e,L.min(),L.min(),St.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(L.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=St.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=St.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=L.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof _t&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new _t(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tr{constructor(t,e){this.position=t,this.inclusive=e}}function Aa(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const o=t[s],a=n.position[s];if(o.field.isKeyField()?r=O.comparator(O.fromName(a.referenceValue),e.key):r=$e(a,e.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function Ra(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Ut(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dn{constructor(t,e="asc"){this.field=t,this.dir=e}}function bm(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uu{}class nt extends uu{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Cm(t,e,r):e==="array-contains"?new Nm(t,r):e==="in"?new km(t,r):e==="not-in"?new Om(t,r):e==="array-contains-any"?new Mm(t,r):new nt(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new Vm(t,r):new Dm(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&e.nullValue===void 0&&this.matchesComparison($e(e,this.value)):e!==null&&oe(this.value)===oe(e)&&this.matchesComparison($e(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return x(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Vt extends uu{constructor(t,e){super(),this.filters=t,this.op=e,this.Pe=null}static create(t,e){return new Vt(t,e)}matches(t){return lu(this)?this.filters.find((e=>!e.matches(t)))===void 0:this.filters.find((e=>e.matches(t)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((t,e)=>t.concat(e.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function lu(n){return n.op==="and"}function hu(n){return Pm(n)&&lu(n)}function Pm(n){for(const t of n.filters)if(t instanceof Vt)return!1;return!0}function Fs(n){if(n instanceof nt)return n.field.canonicalString()+n.op.toString()+ze(n.value);if(hu(n))return n.filters.map((t=>Fs(t))).join(",");{const t=n.filters.map((e=>Fs(e))).join(",");return`${n.op}(${t})`}}function fu(n,t){return n instanceof nt?(function(r,s){return s instanceof nt&&r.op===s.op&&r.field.isEqual(s.field)&&Ut(r.value,s.value)})(n,t):n instanceof Vt?(function(r,s){return s instanceof Vt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((o,a,l)=>o&&fu(a,s.filters[l])),!0):!1})(n,t):void x(19439)}function du(n){return n instanceof nt?(function(e){return`${e.field.canonicalString()} ${e.op} ${ze(e.value)}`})(n):n instanceof Vt?(function(e){return e.op.toString()+" {"+e.getFilters().map(du).join(" ,")+"}"})(n):"Filter"}class Cm extends nt{constructor(t,e,r){super(t,e,r),this.key=O.fromName(r.referenceValue)}matches(t){const e=O.comparator(t.key,this.key);return this.matchesComparison(e)}}class Vm extends nt{constructor(t,e){super(t,"in",e),this.keys=mu("in",e)}matches(t){return this.keys.some((e=>e.isEqual(t.key)))}}class Dm extends nt{constructor(t,e){super(t,"not-in",e),this.keys=mu("not-in",e)}matches(t){return!this.keys.some((e=>e.isEqual(t.key)))}}function mu(n,t){var e;return(((e=t.arrayValue)==null?void 0:e.values)||[]).map((r=>O.fromName(r.referenceValue)))}class Nm extends nt{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return hi(e)&&Vn(e.arrayValue,this.value)}}class km extends nt{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&Vn(this.value.arrayValue,e)}}class Om extends nt{constructor(t,e){super(t,"not-in",e)}matches(t){if(Vn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&e.nullValue===void 0&&!Vn(this.value.arrayValue,e)}}class Mm extends nt{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!hi(e)||!e.arrayValue.values)&&e.arrayValue.values.some((r=>Vn(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xm{constructor(t,e=null,r=[],s=[],o=null,a=null,l=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=l,this.Te=null}}function Sa(n,t=null,e=[],r=[],s=null,o=null,a=null){return new xm(n,t,e,r,s,o,a)}function fi(n){const t=F(n);if(t.Te===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map((r=>Fs(r))).join(","),e+="|ob:",e+=t.orderBy.map((r=>(function(o){return o.field.canonicalString()+o.dir})(r))).join(","),Or(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map((r=>ze(r))).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map((r=>ze(r))).join(",")),t.Te=e}return t.Te}function di(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!bm(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!fu(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!Ra(n.startAt,t.startAt)&&Ra(n.endAt,t.endAt)}function Us(n){return O.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ye{constructor(t,e=null,r=[],s=[],o=null,a="F",l=null,h=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=l,this.endAt=h,this.Ee=null,this.Ie=null,this.Re=null,this.startAt,this.endAt}}function Lm(n,t,e,r,s,o,a,l){return new Ye(n,t,e,r,s,o,a,l)}function mi(n){return new Ye(n)}function ba(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Fm(n){return O.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function pu(n){return n.collectionGroup!==null}function wn(n){const t=F(n);if(t.Ee===null){t.Ee=[];const e=new Set;for(const o of t.explicitOrderBy)t.Ee.push(o),e.add(o.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(a){let l=new ot(lt.comparator);return a.filters.forEach((h=>{h.getFlattenedFilters().forEach((f=>{f.isInequality()&&(l=l.add(f.field))}))})),l})(t).forEach((o=>{e.has(o.canonicalString())||o.isKeyField()||t.Ee.push(new Dn(o,r))})),e.has(lt.keyField().canonicalString())||t.Ee.push(new Dn(lt.keyField(),r))}return t.Ee}function Mt(n){const t=F(n);return t.Ie||(t.Ie=Um(t,wn(n))),t.Ie}function Um(n,t){if(n.limitType==="F")return Sa(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map((s=>{const o=s.dir==="desc"?"asc":"desc";return new Dn(s.field,o)}));const e=n.endAt?new Tr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Tr(n.startAt.position,n.startAt.inclusive):null;return Sa(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function Bs(n,t){const e=n.filters.concat([t]);return new Ye(n.path,n.collectionGroup,n.explicitOrderBy.slice(),e,n.limit,n.limitType,n.startAt,n.endAt)}function Bm(n,t){const e=n.explicitOrderBy.concat([t]);return new Ye(n.path,n.collectionGroup,e,n.filters.slice(),n.limit,n.limitType,n.startAt,n.endAt)}function Ir(n,t,e){return new Ye(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function xr(n,t){return di(Mt(n),Mt(t))&&n.limitType===t.limitType}function gu(n){return`${fi(Mt(n))}|lt:${n.limitType}`}function Me(n){return`Query(target=${(function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map((s=>du(s))).join(", ")}]`),Or(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map((s=>(function(a){return`${a.field.canonicalString()} (${a.dir})`})(s))).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map((s=>ze(s))).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map((s=>ze(s))).join(",")),`Target(${r})`})(Mt(n))}; limitType=${n.limitType})`}function Lr(n,t){return t.isFoundDocument()&&(function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):O.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)})(n,t)&&(function(r,s){for(const o of wn(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0})(n,t)&&(function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0})(n,t)&&(function(r,s){return!(r.startAt&&!(function(a,l,h){const f=Aa(a,l,h);return a.inclusive?f<=0:f<0})(r.startAt,wn(r),s)||r.endAt&&!(function(a,l,h){const f=Aa(a,l,h);return a.inclusive?f>=0:f>0})(r.endAt,wn(r),s))})(n,t)}function qm(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function _u(n){return(t,e)=>{let r=!1;for(const s of wn(n)){const o=jm(s,t,e);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function jm(n,t,e){const r=n.field.isKeyField()?O.comparator(t.key,e.key):(function(o,a,l){const h=a.data.field(o),f=l.data.field(o);return h!==null&&f!==null?$e(h,f):x(42886)})(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return x(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pe{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],t))return void(s[o]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){be(this.inner,((e,r)=>{for(const[s,o]of r)t(s,o)}))}isEmpty(){return tu(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $m=new J(O.comparator);function zt(){return $m}const yu=new J(O.comparator);function _n(...n){let t=yu;for(const e of n)t=t.insert(e.key,e);return t}function Eu(n){let t=yu;return n.forEach(((e,r)=>t=t.insert(e,r.overlayedDocument))),t}function Ee(){return vn()}function Tu(){return vn()}function vn(){return new Pe((n=>n.toString()),((n,t)=>n.isEqual(t)))}const zm=new J(O.comparator),Gm=new ot(O.comparator);function q(...n){let t=Gm;for(const e of n)t=t.add(e);return t}const Hm=new ot(B);function Km(){return Hm}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pi(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:_r(t)?"-0":t}}function Iu(n){return{integerValue:""+n}}function Wm(n,t){return ym(t)?Iu(t):pi(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(){this._=void 0}}function Qm(n,t,e){return n instanceof Nn?(function(s,o){const a={fields:{[ru]:{stringValue:nu},[iu]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&li(o)&&(o=Mr(o)),o&&(a.fields[su]=o),{mapValue:a}})(e,t):n instanceof kn?vu(n,t):n instanceof On?Au(n,t):(function(s,o){const a=wu(s,o),l=Pa(a)+Pa(s.Ae);return Ls(a)&&Ls(s.Ae)?Iu(l):pi(s.serializer,l)})(n,t)}function Ym(n,t,e){return n instanceof kn?vu(n,t):n instanceof On?Au(n,t):e}function wu(n,t){return n instanceof wr?(function(r){return Ls(r)||(function(o){return!!o&&"doubleValue"in o})(r)})(t)?t:{integerValue:0}:null}class Nn extends Fr{}class kn extends Fr{constructor(t){super(),this.elements=t}}function vu(n,t){const e=Ru(t);for(const r of n.elements)e.some((s=>Ut(s,r)))||e.push(r);return{arrayValue:{values:e}}}class On extends Fr{constructor(t){super(),this.elements=t}}function Au(n,t){let e=Ru(t);for(const r of n.elements)e=e.filter((s=>!Ut(s,r)));return{arrayValue:{values:e}}}class wr extends Fr{constructor(t,e){super(),this.serializer=t,this.Ae=e}}function Pa(n){return tt(n.integerValue||n.doubleValue)}function Ru(n){return hi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm{constructor(t,e){this.field=t,this.transform=e}}function Xm(n,t){return n.field.isEqual(t.field)&&(function(r,s){return r instanceof kn&&s instanceof kn||r instanceof On&&s instanceof On?je(r.elements,s.elements,Ut):r instanceof wr&&s instanceof wr?Ut(r.Ae,s.Ae):r instanceof Nn&&s instanceof Nn})(n.transform,t.transform)}class Zm{constructor(t,e){this.version=t,this.transformResults=e}}class Bt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Bt}static exists(t){return new Bt(void 0,t)}static updateTime(t){return new Bt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function lr(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class Ur{}function Su(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new Pu(n.key,Bt.none()):new Ln(n.key,n.data,Bt.none());{const e=n.data,r=St.empty();let s=new ot(lt.comparator);for(let o of t.fields)if(!s.has(o)){let a=e.field(o);a===null&&o.length>1&&(o=o.popLast(),a=e.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new Ce(n.key,r,new Pt(s.toArray()),Bt.none())}}function tp(n,t,e){n instanceof Ln?(function(s,o,a){const l=s.value.clone(),h=Va(s.fieldTransforms,o,a.transformResults);l.setAll(h),o.convertToFoundDocument(a.version,l).setHasCommittedMutations()})(n,t,e):n instanceof Ce?(function(s,o,a){if(!lr(s.precondition,o))return void o.convertToUnknownDocument(a.version);const l=Va(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(bu(s)),h.setAll(l),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()})(n,t,e):(function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()})(0,t,e)}function An(n,t,e,r){return n instanceof Ln?(function(o,a,l,h){if(!lr(o.precondition,a))return l;const f=o.value.clone(),m=Da(o.fieldTransforms,h,a);return f.setAll(m),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),null})(n,t,e,r):n instanceof Ce?(function(o,a,l,h){if(!lr(o.precondition,a))return l;const f=Da(o.fieldTransforms,h,a),m=a.data;return m.setAll(bu(o)),m.setAll(f),a.convertToFoundDocument(a.version,m).setHasLocalMutations(),l===null?null:l.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map((T=>T.field)))})(n,t,e,r):(function(o,a,l){return lr(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):l})(n,t,e)}function ep(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),o=wu(r.transform,s||null);o!=null&&(e===null&&(e=St.empty()),e.set(r.field,o))}return e||null}function Ca(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&je(r,s,((o,a)=>Xm(o,a)))})(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class Ln extends Ur{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ce extends Ur{constructor(t,e,r,s,o=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function bu(n){const t=new Map;return n.fieldMask.fields.forEach((e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}})),t}function Va(n,t,e){const r=new Map;z(n.length===e.length,32656,{Ve:e.length,de:n.length});for(let s=0;s<e.length;s++){const o=n[s],a=o.transform,l=t.data.field(o.field);r.set(o.field,Ym(a,l,e[s]))}return r}function Da(n,t,e){const r=new Map;for(const s of n){const o=s.transform,a=e.data.field(s.field);r.set(s.field,Qm(o,a,t))}return r}class Pu extends Ur{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class np extends Ur{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(t.key)&&tp(o,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=An(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=An(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=Tu();return this.mutations.forEach((s=>{const o=t.get(s.key),a=o.overlayedDocument;let l=this.applyToLocalView(a,o.mutatedFields);l=e.has(s.key)?null:l;const h=Su(a,l);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(L.min())})),r}keys(){return this.mutations.reduce(((t,e)=>t.add(e.key)),q())}isEqual(t){return this.batchId===t.batchId&&je(this.mutations,t.mutations,((e,r)=>Ca(e,r)))&&je(this.baseMutations,t.baseMutations,((e,r)=>Ca(e,r)))}}class gi{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){z(t.mutations.length===r.length,58842,{me:t.mutations.length,fe:r.length});let s=(function(){return zm})();const o=t.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new gi(t,e,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sp{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ip{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var et,j;function op(n){switch(n){case S.OK:return x(64938);case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0;default:return x(15467,{code:n})}}function Cu(n){if(n===void 0)return $t("GRPC error has no .code"),S.UNKNOWN;switch(n){case et.OK:return S.OK;case et.CANCELLED:return S.CANCELLED;case et.UNKNOWN:return S.UNKNOWN;case et.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case et.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case et.INTERNAL:return S.INTERNAL;case et.UNAVAILABLE:return S.UNAVAILABLE;case et.UNAUTHENTICATED:return S.UNAUTHENTICATED;case et.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case et.NOT_FOUND:return S.NOT_FOUND;case et.ALREADY_EXISTS:return S.ALREADY_EXISTS;case et.PERMISSION_DENIED:return S.PERMISSION_DENIED;case et.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case et.ABORTED:return S.ABORTED;case et.OUT_OF_RANGE:return S.OUT_OF_RANGE;case et.UNIMPLEMENTED:return S.UNIMPLEMENTED;case et.DATA_LOSS:return S.DATA_LOSS;default:return x(39323,{code:n})}}(j=et||(et={}))[j.OK=0]="OK",j[j.CANCELLED=1]="CANCELLED",j[j.UNKNOWN=2]="UNKNOWN",j[j.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",j[j.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",j[j.NOT_FOUND=5]="NOT_FOUND",j[j.ALREADY_EXISTS=6]="ALREADY_EXISTS",j[j.PERMISSION_DENIED=7]="PERMISSION_DENIED",j[j.UNAUTHENTICATED=16]="UNAUTHENTICATED",j[j.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",j[j.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",j[j.ABORTED=10]="ABORTED",j[j.OUT_OF_RANGE=11]="OUT_OF_RANGE",j[j.UNIMPLEMENTED=12]="UNIMPLEMENTED",j[j.INTERNAL=13]="INTERNAL",j[j.UNAVAILABLE=14]="UNAVAILABLE",j[j.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ap(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cp=new te([4294967295,4294967295],0);function Na(n){const t=ap().encode(n),e=new $c;return e.update(t),new Uint8Array(e.digest())}function ka(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),o=t.getUint32(12,!0);return[new te([e,r],0),new te([s,o],0)]}class _i{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new yn(`Invalid padding: ${e}`);if(r<0)throw new yn(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new yn(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new yn(`Invalid padding when bitmap length is 0: ${e}`);this.ge=8*t.length-e,this.pe=te.fromNumber(this.ge)}ye(t,e,r){let s=t.add(e.multiply(te.fromNumber(r)));return s.compare(cp)===1&&(s=new te([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(t){return!!(this.bitmap[Math.floor(t/8)]&1<<t%8)}mightContain(t){if(this.ge===0)return!1;const e=Na(t),[r,s]=ka(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);if(!this.we(a))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,o=new Uint8Array(Math.ceil(t/8)),a=new _i(o,s,e);return r.forEach((l=>a.insert(l))),a}insert(t){if(this.ge===0)return;const e=Na(t),[r,s]=ka(e);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);this.Se(a)}}Se(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class yn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Br{constructor(t,e,r,s,o){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,Fn.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new Br(L.min(),s,new J(B),zt(),q())}}class Fn{constructor(t,e,r,s,o){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new Fn(r,e,q(),q(),q())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(t,e,r,s){this.be=t,this.removedTargetIds=e,this.key=r,this.De=s}}class Vu{constructor(t,e){this.targetId=t,this.Ce=e}}class Du{constructor(t,e,r=ht.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class Oa{constructor(){this.ve=0,this.Fe=Ma(),this.Me=ht.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(t){t.approximateByteSize()>0&&(this.Oe=!0,this.Me=t)}ke(){let t=q(),e=q(),r=q();return this.Fe.forEach(((s,o)=>{switch(o){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:x(38017,{changeType:o})}})),new Fn(this.Me,this.xe,t,e,r)}qe(){this.Oe=!1,this.Fe=Ma()}Ke(t,e){this.Oe=!0,this.Fe=this.Fe.insert(t,e)}Ue(t){this.Oe=!0,this.Fe=this.Fe.remove(t)}$e(){this.ve+=1}We(){this.ve-=1,z(this.ve>=0,3241,{ve:this.ve})}Qe(){this.Oe=!0,this.xe=!0}}class up{constructor(t){this.Ge=t,this.ze=new Map,this.je=zt(),this.Je=ir(),this.He=ir(),this.Ze=new J(B)}Xe(t){for(const e of t.be)t.De&&t.De.isFoundDocument()?this.Ye(e,t.De):this.et(e,t.key,t.De);for(const e of t.removedTargetIds)this.et(e,t.key,t.De)}tt(t){this.forEachTarget(t,(e=>{const r=this.nt(e);switch(t.state){case 0:this.rt(e)&&r.Le(t.resumeToken);break;case 1:r.We(),r.Ne||r.qe(),r.Le(t.resumeToken);break;case 2:r.We(),r.Ne||this.removeTarget(e);break;case 3:this.rt(e)&&(r.Qe(),r.Le(t.resumeToken));break;case 4:this.rt(e)&&(this.it(e),r.Le(t.resumeToken));break;default:x(56790,{state:t.state})}}))}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ze.forEach(((r,s)=>{this.rt(s)&&e(s)}))}st(t){const e=t.targetId,r=t.Ce.count,s=this.ot(e);if(s){const o=s.target;if(Us(o))if(r===0){const a=new O(o.path);this.et(e,a,_t.newNoDocument(a,L.min()))}else z(r===1,20013,{expectedCount:r});else{const a=this._t(e);if(a!==r){const l=this.ut(t),h=l?this.ct(l,t,a):1;if(h!==0){this.it(e);const f=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ze=this.Ze.insert(e,f)}}}}}ut(t){const e=t.Ce.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=e;let a,l;try{a=ie(r).toUint8Array()}catch(h){if(h instanceof eu)return Re("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{l=new _i(a,s,o)}catch(h){return Re(h instanceof yn?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return l.ge===0?null:l}ct(t,e,r){return e.Ce.count===r-this.Pt(t,e.targetId)?0:2}Pt(t,e){const r=this.Ge.getRemoteKeysForTarget(e);let s=0;return r.forEach((o=>{const a=this.Ge.ht(),l=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;t.mightContain(l)||(this.et(e,o,null),s++)})),s}Tt(t){const e=new Map;this.ze.forEach(((o,a)=>{const l=this.ot(a);if(l){if(o.current&&Us(l.target)){const h=new O(l.target.path);this.Et(h).has(a)||this.It(a,h)||this.et(a,h,_t.newNoDocument(h,t))}o.Be&&(e.set(a,o.ke()),o.qe())}}));let r=q();this.He.forEach(((o,a)=>{let l=!0;a.forEachWhile((h=>{const f=this.ot(h);return!f||f.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)})),l&&(r=r.add(o))})),this.je.forEach(((o,a)=>a.setReadTime(t)));const s=new Br(t,e,this.Ze,this.je,r);return this.je=zt(),this.Je=ir(),this.He=ir(),this.Ze=new J(B),s}Ye(t,e){if(!this.rt(t))return;const r=this.It(t,e.key)?2:0;this.nt(t).Ke(e.key,r),this.je=this.je.insert(e.key,e),this.Je=this.Je.insert(e.key,this.Et(e.key).add(t)),this.He=this.He.insert(e.key,this.Rt(e.key).add(t))}et(t,e,r){if(!this.rt(t))return;const s=this.nt(t);this.It(t,e)?s.Ke(e,1):s.Ue(e),this.He=this.He.insert(e,this.Rt(e).delete(t)),this.He=this.He.insert(e,this.Rt(e).add(t)),r&&(this.je=this.je.insert(e,r))}removeTarget(t){this.ze.delete(t)}_t(t){const e=this.nt(t).ke();return this.Ge.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}$e(t){this.nt(t).$e()}nt(t){let e=this.ze.get(t);return e||(e=new Oa,this.ze.set(t,e)),e}Rt(t){let e=this.He.get(t);return e||(e=new ot(B),this.He=this.He.insert(t,e)),e}Et(t){let e=this.Je.get(t);return e||(e=new ot(B),this.Je=this.Je.insert(t,e)),e}rt(t){const e=this.ot(t)!==null;return e||D("WatchChangeAggregator","Detected inactive target",t),e}ot(t){const e=this.ze.get(t);return e&&e.Ne?null:this.Ge.At(t)}it(t){this.ze.set(t,new Oa),this.Ge.getRemoteKeysForTarget(t).forEach((e=>{this.et(t,e,null)}))}It(t,e){return this.Ge.getRemoteKeysForTarget(t).has(e)}}function ir(){return new J(O.comparator)}function Ma(){return new J(O.comparator)}const lp={asc:"ASCENDING",desc:"DESCENDING"},hp={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},fp={and:"AND",or:"OR"};class dp{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function qs(n,t){return n.useProto3Json||Or(t)?t:{value:t}}function vr(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Nu(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function mp(n,t){return vr(n,t.toTimestamp())}function xt(n){return z(!!n,49232),L.fromTimestamp((function(e){const r=se(e);return new Y(r.seconds,r.nanos)})(n))}function yi(n,t){return js(n,t).canonicalString()}function js(n,t){const e=(function(s){return new W(["projects",s.projectId,"databases",s.database])})(n).child("documents");return t===void 0?e:e.child(t)}function ku(n){const t=W.fromString(n);return z(Fu(t),10190,{key:t.toString()}),t}function $s(n,t){return yi(n.databaseId,t.path)}function As(n,t){const e=ku(t);if(e.get(1)!==n.databaseId.projectId)throw new V(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new V(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new O(Mu(e))}function Ou(n,t){return yi(n.databaseId,t)}function pp(n){const t=ku(n);return t.length===4?W.emptyPath():Mu(t)}function zs(n){return new W(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Mu(n){return z(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function xa(n,t,e){return{name:$s(n,t),fields:e.value.mapValue.fields}}function gp(n,t){let e;if("targetChange"in t){t.targetChange;const r=(function(f){return f==="NO_CHANGE"?0:f==="ADD"?1:f==="REMOVE"?2:f==="CURRENT"?3:f==="RESET"?4:x(39313,{state:f})})(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],o=(function(f,m){return f.useProto3Json?(z(m===void 0||typeof m=="string",58123),ht.fromBase64String(m||"")):(z(m===void 0||m instanceof Buffer||m instanceof Uint8Array,16193),ht.fromUint8Array(m||new Uint8Array))})(n,t.targetChange.resumeToken),a=t.targetChange.cause,l=a&&(function(f){const m=f.code===void 0?S.UNKNOWN:Cu(f.code);return new V(m,f.message||"")})(a);e=new Du(r,s,o,l||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=As(n,r.document.name),o=xt(r.document.updateTime),a=r.document.createTime?xt(r.document.createTime):L.min(),l=new St({mapValue:{fields:r.document.fields}}),h=_t.newFoundDocument(s,o,a,l),f=r.targetIds||[],m=r.removedTargetIds||[];e=new hr(f,m,h.key,h)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=As(n,r.document),o=r.readTime?xt(r.readTime):L.min(),a=_t.newNoDocument(s,o),l=r.removedTargetIds||[];e=new hr([],l,a.key,a)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=As(n,r.document),o=r.removedTargetIds||[];e=new hr([],o,s,null)}else{if(!("filter"in t))return x(11601,{Vt:t});{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new ip(s,o),l=r.targetId;e=new Vu(l,a)}}return e}function _p(n,t){let e;if(t instanceof Ln)e={update:xa(n,t.key,t.value)};else if(t instanceof Pu)e={delete:$s(n,t.key)};else if(t instanceof Ce)e={update:xa(n,t.key,t.data),updateMask:Sp(t.fieldMask)};else{if(!(t instanceof np))return x(16599,{dt:t.type});e={verify:$s(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map((r=>(function(o,a){const l=a.transform;if(l instanceof Nn)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof kn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof On)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof wr)return{fieldPath:a.field.canonicalString(),increment:l.Ae};throw x(20930,{transform:a.transform})})(0,r)))),t.precondition.isNone||(e.currentDocument=(function(s,o){return o.updateTime!==void 0?{updateTime:mp(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:x(27497)})(n,t.precondition)),e}function yp(n,t){return n&&n.length>0?(z(t!==void 0,14353),n.map((e=>(function(s,o){let a=s.updateTime?xt(s.updateTime):xt(o);return a.isEqual(L.min())&&(a=xt(o)),new Zm(a,s.transformResults||[])})(e,t)))):[]}function Ep(n,t){return{documents:[Ou(n,t.path)]}}function Tp(n,t){const e={structuredQuery:{}},r=t.path;let s;t.collectionGroup!==null?(s=r,e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(s=r.popLast(),e.structuredQuery.from=[{collectionId:r.lastSegment()}]),e.parent=Ou(n,s);const o=(function(f){if(f.length!==0)return Lu(Vt.create(f,"and"))})(t.filters);o&&(e.structuredQuery.where=o);const a=(function(f){if(f.length!==0)return f.map((m=>(function(R){return{field:xe(R.field),direction:vp(R.dir)}})(m)))})(t.orderBy);a&&(e.structuredQuery.orderBy=a);const l=qs(n,t.limit);return l!==null&&(e.structuredQuery.limit=l),t.startAt&&(e.structuredQuery.startAt=(function(f){return{before:f.inclusive,values:f.position}})(t.startAt)),t.endAt&&(e.structuredQuery.endAt=(function(f){return{before:!f.inclusive,values:f.position}})(t.endAt)),{ft:e,parent:s}}function Ip(n){let t=pp(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){z(r===1,65062);const m=e.from[0];m.allDescendants?s=m.collectionId:t=t.child(m.collectionId)}let o=[];e.where&&(o=(function(T){const R=xu(T);return R instanceof Vt&&hu(R)?R.getFilters():[R]})(e.where));let a=[];e.orderBy&&(a=(function(T){return T.map((R=>(function(N){return new Dn(Le(N.field),(function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(N.direction))})(R)))})(e.orderBy));let l=null;e.limit&&(l=(function(T){let R;return R=typeof T=="object"?T.value:T,Or(R)?null:R})(e.limit));let h=null;e.startAt&&(h=(function(T){const R=!!T.before,P=T.values||[];return new Tr(P,R)})(e.startAt));let f=null;return e.endAt&&(f=(function(T){const R=!T.before,P=T.values||[];return new Tr(P,R)})(e.endAt)),Lm(t,s,a,o,l,"F",h,f)}function wp(n,t){const e=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return x(28987,{purpose:s})}})(t.purpose);return e==null?null:{"goog-listen-tags":e}}function xu(n){return n.unaryFilter!==void 0?(function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=Le(e.unaryFilter.field);return nt.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Le(e.unaryFilter.field);return nt.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Le(e.unaryFilter.field);return nt.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Le(e.unaryFilter.field);return nt.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return x(61313);default:return x(60726)}})(n):n.fieldFilter!==void 0?(function(e){return nt.create(Le(e.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return x(58110);default:return x(50506)}})(e.fieldFilter.op),e.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(e){return Vt.create(e.compositeFilter.filters.map((r=>xu(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return x(1026)}})(e.compositeFilter.op))})(n):x(30097,{filter:n})}function vp(n){return lp[n]}function Ap(n){return hp[n]}function Rp(n){return fp[n]}function xe(n){return{fieldPath:n.canonicalString()}}function Le(n){return lt.fromServerFormat(n.fieldPath)}function Lu(n){return n instanceof nt?(function(e){if(e.op==="=="){if(va(e.value))return{unaryFilter:{field:xe(e.field),op:"IS_NAN"}};if(wa(e.value))return{unaryFilter:{field:xe(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(va(e.value))return{unaryFilter:{field:xe(e.field),op:"IS_NOT_NAN"}};if(wa(e.value))return{unaryFilter:{field:xe(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:xe(e.field),op:Ap(e.op),value:e.value}}})(n):n instanceof Vt?(function(e){const r=e.getFilters().map((s=>Lu(s)));return r.length===1?r[0]:{compositeFilter:{op:Rp(e.op),filters:r}}})(n):x(54877,{filter:n})}function Sp(n){const t=[];return n.fields.forEach((e=>t.push(e.canonicalString()))),{fieldPaths:t}}function Fu(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Uu(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jt{constructor(t,e,r,s,o=L.min(),a=L.min(),l=ht.EMPTY_BYTE_STRING,h=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=l,this.expectedCount=h}withSequenceNumber(t){return new Jt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Jt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bp{constructor(t){this.yt=t}}function Pp(n){const t=Ip({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Ir(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cp{constructor(){this.bn=new Vp}addToCollectionParentIndex(t,e){return this.bn.add(e),b.resolve()}getCollectionParents(t,e){return b.resolve(this.bn.getEntries(e))}addFieldIndex(t,e){return b.resolve()}deleteFieldIndex(t,e){return b.resolve()}deleteAllFieldIndexes(t){return b.resolve()}createTargetIndexes(t,e){return b.resolve()}getDocumentsMatchingTarget(t,e){return b.resolve(null)}getIndexType(t,e){return b.resolve(0)}getFieldIndexes(t,e){return b.resolve([])}getNextCollectionGroupToUpdate(t){return b.resolve(null)}getMinOffset(t,e){return b.resolve(re.min())}getMinOffsetFromCollectionGroup(t,e){return b.resolve(re.min())}updateCollectionGroup(t,e,r){return b.resolve()}updateIndexEntries(t,e){return b.resolve()}}class Vp{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new ot(W.comparator),o=!s.has(r);return this.index[e]=s.add(r),o}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new ot(W.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const La={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Bu=41943040;class wt{static withCacheSize(t){return new wt(t,wt.DEFAULT_COLLECTION_PERCENTILE,wt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(t,e,r){this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */wt.DEFAULT_COLLECTION_PERCENTILE=10,wt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,wt.DEFAULT=new wt(Bu,wt.DEFAULT_COLLECTION_PERCENTILE,wt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),wt.DISABLED=new wt(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(t){this.sr=t}next(){return this.sr+=2,this.sr}static _r(){return new Ge(0)}static ar(){return new Ge(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fa="LruGarbageCollector",Dp=1048576;function Ua([n,t],[e,r]){const s=B(n,e);return s===0?B(t,r):s}class Np{constructor(t){this.Pr=t,this.buffer=new ot(Ua),this.Tr=0}Er(){return++this.Tr}Ir(t){const e=[t,this.Er()];if(this.buffer.size<this.Pr)this.buffer=this.buffer.add(e);else{const r=this.buffer.last();Ua(e,r)<0&&(this.buffer=this.buffer.delete(r).add(e))}}get maxValue(){return this.buffer.last()[0]}}class kp{constructor(t,e,r){this.garbageCollector=t,this.asyncQueue=e,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Ar(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Ar(t){D(Fa,`Garbage collection scheduled in ${t}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",t,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(e){Qe(e)?D(Fa,"Ignoring IndexedDB error during garbage collection: ",e):await We(e)}await this.Ar(3e5)}))}}class Op{constructor(t,e){this.Vr=t,this.params=e}calculateTargetCount(t,e){return this.Vr.dr(t).next((r=>Math.floor(e/100*r)))}nthSequenceNumber(t,e){if(e===0)return b.resolve(kr.ce);const r=new Np(e);return this.Vr.forEachTarget(t,(s=>r.Ir(s.sequenceNumber))).next((()=>this.Vr.mr(t,(s=>r.Ir(s))))).next((()=>r.maxValue))}removeTargets(t,e,r){return this.Vr.removeTargets(t,e,r)}removeOrphanedDocuments(t,e){return this.Vr.removeOrphanedDocuments(t,e)}collect(t,e){return this.params.cacheSizeCollectionThreshold===-1?(D("LruGarbageCollector","Garbage collection skipped; disabled"),b.resolve(La)):this.getCacheSize(t).next((r=>r<this.params.cacheSizeCollectionThreshold?(D("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),La):this.gr(t,e)))}getCacheSize(t){return this.Vr.getCacheSize(t)}gr(t,e){let r,s,o,a,l,h,f;const m=Date.now();return this.calculateTargetCount(t,this.params.percentileToCollect).next((T=>(T>this.params.maximumSequenceNumbersToCollect?(D("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${T}`),s=this.params.maximumSequenceNumbersToCollect):s=T,a=Date.now(),this.nthSequenceNumber(t,s)))).next((T=>(r=T,l=Date.now(),this.removeTargets(t,r,e)))).next((T=>(o=T,h=Date.now(),this.removeOrphanedDocuments(t,r)))).next((T=>(f=Date.now(),Oe()<=$.DEBUG&&D("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-m}ms
	Determined least recently used ${s} in `+(l-a)+`ms
	Removed ${o} targets in `+(h-l)+`ms
	Removed ${T} documents in `+(f-h)+`ms
Total Duration: ${f-m}ms`),b.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:T}))))}}function Mp(n,t){return new Op(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xp{constructor(){this.changes=new Pe((t=>t.toString()),((t,e)=>t.isEqual(e))),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,_t.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?b.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lp{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fp{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next((s=>(r=s,this.remoteDocumentCache.getEntry(t,e)))).next((s=>(r!==null&&An(r.mutation,s,Pt.empty(),Y.now()),s)))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.getLocalViewOfDocuments(t,r,q()).next((()=>r))))}getLocalViewOfDocuments(t,e,r=q()){const s=Ee();return this.populateOverlays(t,s,e).next((()=>this.computeViews(t,e,s,r).next((o=>{let a=_n();return o.forEach(((l,h)=>{a=a.insert(l,h.overlayedDocument)})),a}))))}getOverlayedDocuments(t,e){const r=Ee();return this.populateOverlays(t,r,e).next((()=>this.computeViews(t,e,r,q())))}populateOverlays(t,e,r){const s=[];return r.forEach((o=>{e.has(o)||s.push(o)})),this.documentOverlayCache.getOverlays(t,s).next((o=>{o.forEach(((a,l)=>{e.set(a,l)}))}))}computeViews(t,e,r,s){let o=zt();const a=vn(),l=(function(){return vn()})();return e.forEach(((h,f)=>{const m=r.get(f.key);s.has(f.key)&&(m===void 0||m.mutation instanceof Ce)?o=o.insert(f.key,f):m!==void 0?(a.set(f.key,m.mutation.getFieldMask()),An(m.mutation,f,m.mutation.getFieldMask(),Y.now())):a.set(f.key,Pt.empty())})),this.recalculateAndSaveOverlays(t,o).next((h=>(h.forEach(((f,m)=>a.set(f,m))),e.forEach(((f,m)=>l.set(f,new Lp(m,a.get(f)??null)))),l)))}recalculateAndSaveOverlays(t,e){const r=vn();let s=new J(((a,l)=>a-l)),o=q();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next((a=>{for(const l of a)l.keys().forEach((h=>{const f=e.get(h);if(f===null)return;let m=r.get(h)||Pt.empty();m=l.applyToLocalView(f,m),r.set(h,m);const T=(s.get(l.batchId)||q()).add(h);s=s.insert(l.batchId,T)}))})).next((()=>{const a=[],l=s.getReverseIterator();for(;l.hasNext();){const h=l.getNext(),f=h.key,m=h.value,T=Tu();m.forEach((R=>{if(!o.has(R)){const P=Su(e.get(R),r.get(R));P!==null&&T.set(R,P),o=o.add(R)}})),a.push(this.documentOverlayCache.saveOverlays(t,f,T))}return b.waitFor(a)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next((r=>this.recalculateAndSaveOverlays(t,r)))}getDocumentsMatchingQuery(t,e,r,s){return Fm(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):pu(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next((o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-o.size):b.resolve(Ee());let l=bn,h=o;return a.next((f=>b.forEach(f,((m,T)=>(l<T.largestBatchId&&(l=T.largestBatchId),o.get(m)?b.resolve():this.remoteDocumentCache.getEntry(t,m).next((R=>{h=h.insert(m,R)}))))).next((()=>this.populateOverlays(t,f,o))).next((()=>this.computeViews(t,h,f,q()))).next((m=>({batchId:l,changes:Eu(m)})))))}))}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new O(e)).next((r=>{let s=_n();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const o=e.collectionGroup;let a=_n();return this.indexManager.getCollectionParents(t,o).next((l=>b.forEach(l,(h=>{const f=(function(T,R){return new Ye(R,null,T.explicitOrderBy.slice(),T.filters.slice(),T.limit,T.limitType,T.startAt,T.endAt)})(e,h.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,r,s).next((m=>{m.forEach(((T,R)=>{a=a.insert(T,R)}))}))})).next((()=>a))))}getDocumentsMatchingCollectionQuery(t,e,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next((a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,o,s)))).next((a=>{o.forEach(((h,f)=>{const m=f.getKey();a.get(m)===null&&(a=a.insert(m,_t.newInvalidDocument(m)))}));let l=_n();return a.forEach(((h,f)=>{const m=o.get(h);m!==void 0&&An(m.mutation,f,Pt.empty(),Y.now()),Lr(e,f)&&(l=l.insert(h,f))})),l}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Up{constructor(t){this.serializer=t,this.Nr=new Map,this.Br=new Map}getBundleMetadata(t,e){return b.resolve(this.Nr.get(e))}saveBundleMetadata(t,e){return this.Nr.set(e.id,(function(s){return{id:s.id,version:s.version,createTime:xt(s.createTime)}})(e)),b.resolve()}getNamedQuery(t,e){return b.resolve(this.Br.get(e))}saveNamedQuery(t,e){return this.Br.set(e.name,(function(s){return{name:s.name,query:Pp(s.bundledQuery),readTime:xt(s.readTime)}})(e)),b.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bp{constructor(){this.overlays=new J(O.comparator),this.Lr=new Map}getOverlay(t,e){return b.resolve(this.overlays.get(e))}getOverlays(t,e){const r=Ee();return b.forEach(e,(s=>this.getOverlay(t,s).next((o=>{o!==null&&r.set(s,o)})))).next((()=>r))}saveOverlays(t,e,r){return r.forEach(((s,o)=>{this.St(t,e,o)})),b.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.Lr.get(r);return s!==void 0&&(s.forEach((o=>this.overlays=this.overlays.remove(o))),this.Lr.delete(r)),b.resolve()}getOverlaysForCollection(t,e,r){const s=Ee(),o=e.length+1,a=new O(e.child("")),l=this.overlays.getIteratorFrom(a);for(;l.hasNext();){const h=l.getNext().value,f=h.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return b.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let o=new J(((f,m)=>f-m));const a=this.overlays.getIterator();for(;a.hasNext();){const f=a.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>r){let m=o.get(f.largestBatchId);m===null&&(m=Ee(),o=o.insert(f.largestBatchId,m)),m.set(f.getKey(),f)}}const l=Ee(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach(((f,m)=>l.set(f,m))),!(l.size()>=s)););return b.resolve(l)}St(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Lr.get(s.largestBatchId).delete(r.key);this.Lr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new sp(e,r));let o=this.Lr.get(e);o===void 0&&(o=q(),this.Lr.set(e,o)),this.Lr.set(e,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qp{constructor(){this.sessionToken=ht.EMPTY_BYTE_STRING}getSessionToken(t){return b.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,b.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ei{constructor(){this.kr=new ot(ct.qr),this.Kr=new ot(ct.Ur)}isEmpty(){return this.kr.isEmpty()}addReference(t,e){const r=new ct(t,e);this.kr=this.kr.add(r),this.Kr=this.Kr.add(r)}$r(t,e){t.forEach((r=>this.addReference(r,e)))}removeReference(t,e){this.Wr(new ct(t,e))}Qr(t,e){t.forEach((r=>this.removeReference(r,e)))}Gr(t){const e=new O(new W([])),r=new ct(e,t),s=new ct(e,t+1),o=[];return this.Kr.forEachInRange([r,s],(a=>{this.Wr(a),o.push(a.key)})),o}zr(){this.kr.forEach((t=>this.Wr(t)))}Wr(t){this.kr=this.kr.delete(t),this.Kr=this.Kr.delete(t)}jr(t){const e=new O(new W([])),r=new ct(e,t),s=new ct(e,t+1);let o=q();return this.Kr.forEachInRange([r,s],(a=>{o=o.add(a.key)})),o}containsKey(t){const e=new ct(t,0),r=this.kr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class ct{constructor(t,e){this.key=t,this.Jr=e}static qr(t,e){return O.comparator(t.key,e.key)||B(t.Jr,e.Jr)}static Ur(t,e){return B(t.Jr,e.Jr)||O.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Yn=1,this.Hr=new ot(ct.qr)}checkEmpty(t){return b.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const o=this.Yn;this.Yn++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new rp(o,e,r,s);this.mutationQueue.push(a);for(const l of s)this.Hr=this.Hr.add(new ct(l.key,o)),this.indexManager.addToCollectionParentIndex(t,l.key.path.popLast());return b.resolve(a)}lookupMutationBatch(t,e){return b.resolve(this.Zr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.Xr(r),o=s<0?0:s;return b.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return b.resolve(this.mutationQueue.length===0?ui:this.Yn-1)}getAllMutationBatches(t){return b.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new ct(e,0),s=new ct(e,Number.POSITIVE_INFINITY),o=[];return this.Hr.forEachInRange([r,s],(a=>{const l=this.Zr(a.Jr);o.push(l)})),b.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new ot(B);return e.forEach((s=>{const o=new ct(s,0),a=new ct(s,Number.POSITIVE_INFINITY);this.Hr.forEachInRange([o,a],(l=>{r=r.add(l.Jr)}))})),b.resolve(this.Yr(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let o=r;O.isDocumentKey(o)||(o=o.child(""));const a=new ct(new O(o),0);let l=new ot(B);return this.Hr.forEachWhile((h=>{const f=h.key.path;return!!r.isPrefixOf(f)&&(f.length===s&&(l=l.add(h.Jr)),!0)}),a),b.resolve(this.Yr(l))}Yr(t){const e=[];return t.forEach((r=>{const s=this.Zr(r);s!==null&&e.push(s)})),e}removeMutationBatch(t,e){z(this.ei(e.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Hr;return b.forEach(e.mutations,(s=>{const o=new ct(s.key,e.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)})).next((()=>{this.Hr=r}))}nr(t){}containsKey(t,e){const r=new ct(e,0),s=this.Hr.firstAfterOrEqual(r);return b.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,b.resolve()}ei(t,e){return this.Xr(t)}Xr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Zr(t){const e=this.Xr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $p{constructor(t){this.ti=t,this.docs=(function(){return new J(O.comparator)})(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),o=s?s.size:0,a=this.ti(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return b.resolve(r?r.document.mutableCopy():_t.newInvalidDocument(e))}getEntries(t,e){let r=zt();return e.forEach((s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():_t.newInvalidDocument(s))})),b.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let o=zt();const a=e.path,l=new O(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(l);for(;h.hasNext();){const{key:f,value:{document:m}}=h.getNext();if(!a.isPrefixOf(f.path))break;f.path.length>a.length+1||mm(dm(m),r)<=0||(s.has(m.key)||Lr(e,m))&&(o=o.insert(m.key,m.mutableCopy()))}return b.resolve(o)}getAllFromCollectionGroup(t,e,r,s){x(9500)}ni(t,e){return b.forEach(this.docs,(r=>e(r)))}newChangeBuffer(t){return new zp(this)}getSize(t){return b.resolve(this.size)}}class zp extends xp{constructor(t){super(),this.Mr=t}applyChanges(t){const e=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?e.push(this.Mr.addEntry(t,s)):this.Mr.removeEntry(r)})),b.waitFor(e)}getFromCache(t,e){return this.Mr.getEntry(t,e)}getAllFromCache(t,e){return this.Mr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gp{constructor(t){this.persistence=t,this.ri=new Pe((e=>fi(e)),di),this.lastRemoteSnapshotVersion=L.min(),this.highestTargetId=0,this.ii=0,this.si=new Ei,this.targetCount=0,this.oi=Ge._r()}forEachTarget(t,e){return this.ri.forEach(((r,s)=>e(s))),b.resolve()}getLastRemoteSnapshotVersion(t){return b.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return b.resolve(this.ii)}allocateTargetId(t){return this.highestTargetId=this.oi.next(),b.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.ii&&(this.ii=e),b.resolve()}lr(t){this.ri.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.oi=new Ge(e),this.highestTargetId=e),t.sequenceNumber>this.ii&&(this.ii=t.sequenceNumber)}addTargetData(t,e){return this.lr(e),this.targetCount+=1,b.resolve()}updateTargetData(t,e){return this.lr(e),b.resolve()}removeTargetData(t,e){return this.ri.delete(e.target),this.si.Gr(e.targetId),this.targetCount-=1,b.resolve()}removeTargets(t,e,r){let s=0;const o=[];return this.ri.forEach(((a,l)=>{l.sequenceNumber<=e&&r.get(l.targetId)===null&&(this.ri.delete(a),o.push(this.removeMatchingKeysForTargetId(t,l.targetId)),s++)})),b.waitFor(o).next((()=>s))}getTargetCount(t){return b.resolve(this.targetCount)}getTargetData(t,e){const r=this.ri.get(e)||null;return b.resolve(r)}addMatchingKeys(t,e,r){return this.si.$r(e,r),b.resolve()}removeMatchingKeys(t,e,r){this.si.Qr(e,r);const s=this.persistence.referenceDelegate,o=[];return s&&e.forEach((a=>{o.push(s.markPotentiallyOrphaned(t,a))})),b.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.si.Gr(e),b.resolve()}getMatchingKeysForTargetId(t,e){const r=this.si.jr(e);return b.resolve(r)}containsKey(t,e){return b.resolve(this.si.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(t,e){this._i={},this.overlays={},this.ai=new kr(0),this.ui=!1,this.ui=!0,this.ci=new qp,this.referenceDelegate=t(this),this.li=new Gp(this),this.indexManager=new Cp,this.remoteDocumentCache=(function(s){return new $p(s)})((r=>this.referenceDelegate.hi(r))),this.serializer=new bp(e),this.Pi=new Up(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ui=!1,Promise.resolve()}get started(){return this.ui}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Bp,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this._i[t.toKey()];return r||(r=new jp(e,this.referenceDelegate),this._i[t.toKey()]=r),r}getGlobalsCache(){return this.ci}getTargetCache(){return this.li}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Pi}runTransaction(t,e,r){D("MemoryPersistence","Starting transaction:",t);const s=new Hp(this.ai.next());return this.referenceDelegate.Ti(),r(s).next((o=>this.referenceDelegate.Ei(s).next((()=>o)))).toPromise().then((o=>(s.raiseOnCommittedEvent(),o)))}Ii(t,e){return b.or(Object.values(this._i).map((r=>()=>r.containsKey(t,e))))}}class Hp extends gm{constructor(t){super(),this.currentSequenceNumber=t}}class Ti{constructor(t){this.persistence=t,this.Ri=new Ei,this.Ai=null}static Vi(t){return new Ti(t)}get di(){if(this.Ai)return this.Ai;throw x(60996)}addReference(t,e,r){return this.Ri.addReference(r,e),this.di.delete(r.toString()),b.resolve()}removeReference(t,e,r){return this.Ri.removeReference(r,e),this.di.add(r.toString()),b.resolve()}markPotentiallyOrphaned(t,e){return this.di.add(e.toString()),b.resolve()}removeTarget(t,e){this.Ri.Gr(e.targetId).forEach((s=>this.di.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next((s=>{s.forEach((o=>this.di.add(o.toString())))})).next((()=>r.removeTargetData(t,e)))}Ti(){this.Ai=new Set}Ei(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return b.forEach(this.di,(r=>{const s=O.fromPath(r);return this.mi(t,s).next((o=>{o||e.removeEntry(s,L.min())}))})).next((()=>(this.Ai=null,e.apply(t))))}updateLimboDocument(t,e){return this.mi(t,e).next((r=>{r?this.di.delete(e.toString()):this.di.add(e.toString())}))}hi(t){return 0}mi(t,e){return b.or([()=>b.resolve(this.Ri.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Ii(t,e)])}}class Ar{constructor(t,e){this.persistence=t,this.fi=new Pe((r=>Em(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=Mp(this,e)}static Vi(t,e){return new Ar(t,e)}Ti(){}Ei(t){return b.resolve()}forEachTarget(t,e){return this.persistence.getTargetCache().forEachTarget(t,e)}dr(t){const e=this.pr(t);return this.persistence.getTargetCache().getTargetCount(t).next((r=>e.next((s=>r+s))))}pr(t){let e=0;return this.mr(t,(r=>{e++})).next((()=>e))}mr(t,e){return b.forEach(this.fi,((r,s)=>this.wr(t,r,s).next((o=>o?b.resolve():e(s)))))}removeTargets(t,e,r){return this.persistence.getTargetCache().removeTargets(t,e,r)}removeOrphanedDocuments(t,e){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.ni(t,(a=>this.wr(t,a,e).next((l=>{l||(r++,o.removeEntry(a,L.min()))})))).next((()=>o.apply(t))).next((()=>r))}markPotentiallyOrphaned(t,e){return this.fi.set(e,t.currentSequenceNumber),b.resolve()}removeTarget(t,e){const r=e.withSequenceNumber(t.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(t,r)}addReference(t,e,r){return this.fi.set(r,t.currentSequenceNumber),b.resolve()}removeReference(t,e,r){return this.fi.set(r,t.currentSequenceNumber),b.resolve()}updateLimboDocument(t,e){return this.fi.set(e,t.currentSequenceNumber),b.resolve()}hi(t){let e=t.key.toString().length;return t.isFoundDocument()&&(e+=cr(t.data.value)),e}wr(t,e,r){return b.or([()=>this.persistence.Ii(t,e),()=>this.persistence.getTargetCache().containsKey(t,e),()=>{const s=this.fi.get(e);return b.resolve(s!==void 0&&s>r)}])}getCacheSize(t){return this.persistence.getRemoteDocumentCache().getSize(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ii{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.Ts=r,this.Es=s}static Is(t,e){let r=q(),s=q();for(const o of e.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new Ii(t,e.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kp{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wp{constructor(){this.Rs=!1,this.As=!1,this.Vs=100,this.ds=(function(){return fh()?8:_m(lh())>0?6:4})()}initialize(t,e){this.fs=t,this.indexManager=e,this.Rs=!0}getDocumentsMatchingQuery(t,e,r,s){const o={result:null};return this.gs(t,e).next((a=>{o.result=a})).next((()=>{if(!o.result)return this.ps(t,e,s,r).next((a=>{o.result=a}))})).next((()=>{if(o.result)return;const a=new Kp;return this.ys(t,e,a).next((l=>{if(o.result=l,this.As)return this.ws(t,e,a,l.size)}))})).next((()=>o.result))}ws(t,e,r,s){return r.documentReadCount<this.Vs?(Oe()<=$.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",Me(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),b.resolve()):(Oe()<=$.DEBUG&&D("QueryEngine","Query:",Me(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.ds*s?(Oe()<=$.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",Me(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,Mt(e))):b.resolve())}gs(t,e){if(ba(e))return b.resolve(null);let r=Mt(e);return this.indexManager.getIndexType(t,r).next((s=>s===0?null:(e.limit!==null&&s===1&&(e=Ir(e,null,"F"),r=Mt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next((o=>{const a=q(...o);return this.fs.getDocuments(t,a).next((l=>this.indexManager.getMinOffset(t,r).next((h=>{const f=this.Ss(e,l);return this.bs(e,f,a,h.readTime)?this.gs(t,Ir(e,null,"F")):this.Ds(t,f,e,h)}))))})))))}ps(t,e,r,s){return ba(e)||s.isEqual(L.min())?b.resolve(null):this.fs.getDocuments(t,r).next((o=>{const a=this.Ss(e,o);return this.bs(e,a,r,s)?b.resolve(null):(Oe()<=$.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Me(e)),this.Ds(t,a,e,fm(s,bn)).next((l=>l)))}))}Ss(t,e){let r=new ot(_u(t));return e.forEach(((s,o)=>{Lr(t,o)&&(r=r.add(o))})),r}bs(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}ys(t,e,r){return Oe()<=$.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",Me(e)),this.fs.getDocumentsMatchingQuery(t,e,re.min(),r)}Ds(t,e,r,s){return this.fs.getDocumentsMatchingQuery(t,r,s).next((o=>(e.forEach((a=>{o=o.insert(a.key,a)})),o)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wi="LocalStore",Qp=3e8;class Yp{constructor(t,e,r,s){this.persistence=t,this.Cs=e,this.serializer=s,this.vs=new J(B),this.Fs=new Pe((o=>fi(o)),di),this.Ms=new Map,this.xs=t.getRemoteDocumentCache(),this.li=t.getTargetCache(),this.Pi=t.getBundleCache(),this.Os(r)}Os(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Fp(this.xs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.xs.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(e=>t.collect(e,this.vs)))}}function Jp(n,t,e,r){return new Yp(n,t,e,r)}async function ju(n,t){const e=F(n);return await e.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next((o=>(s=o,e.Os(t),e.mutationQueue.getAllMutationBatches(r)))).next((o=>{const a=[],l=[];let h=q();for(const f of s){a.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}for(const f of o){l.push(f.batchId);for(const m of f.mutations)h=h.add(m.key)}return e.localDocuments.getDocuments(r,h).next((f=>({Ns:f,removedBatchIds:a,addedBatchIds:l})))}))}))}function Xp(n,t){const e=F(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=t.batch.keys(),o=e.xs.newChangeBuffer({trackRemovals:!0});return(function(l,h,f,m){const T=f.batch,R=T.keys();let P=b.resolve();return R.forEach((N=>{P=P.next((()=>m.getEntry(h,N))).next((M=>{const k=f.docVersions.get(N);z(k!==null,48541),M.version.compareTo(k)<0&&(T.applyToRemoteDocument(M,f),M.isValidDocument()&&(M.setReadTime(f.commitVersion),m.addEntry(M)))}))})),P.next((()=>l.mutationQueue.removeMutationBatch(h,T)))})(e,r,t,o).next((()=>o.apply(r))).next((()=>e.mutationQueue.performConsistencyCheck(r))).next((()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId))).next((()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(l){let h=q();for(let f=0;f<l.mutationResults.length;++f)l.mutationResults[f].transformResults.length>0&&(h=h.add(l.batch.mutations[f].key));return h})(t)))).next((()=>e.localDocuments.getDocuments(r,s)))}))}function $u(n){const t=F(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",(e=>t.li.getLastRemoteSnapshotVersion(e)))}function Zp(n,t){const e=F(n),r=t.snapshotVersion;let s=e.vs;return e.persistence.runTransaction("Apply remote event","readwrite-primary",(o=>{const a=e.xs.newChangeBuffer({trackRemovals:!0});s=e.vs;const l=[];t.targetChanges.forEach(((m,T)=>{const R=s.get(T);if(!R)return;l.push(e.li.removeMatchingKeys(o,m.removedDocuments,T).next((()=>e.li.addMatchingKeys(o,m.addedDocuments,T))));let P=R.withSequenceNumber(o.currentSequenceNumber);t.targetMismatches.get(T)!==null?P=P.withResumeToken(ht.EMPTY_BYTE_STRING,L.min()).withLastLimboFreeSnapshotVersion(L.min()):m.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(m.resumeToken,r)),s=s.insert(T,P),(function(M,k,K){return M.resumeToken.approximateByteSize()===0||k.snapshotVersion.toMicroseconds()-M.snapshotVersion.toMicroseconds()>=Qp?!0:K.addedDocuments.size+K.modifiedDocuments.size+K.removedDocuments.size>0})(R,P,m)&&l.push(e.li.updateTargetData(o,P))}));let h=zt(),f=q();if(t.documentUpdates.forEach((m=>{t.resolvedLimboDocuments.has(m)&&l.push(e.persistence.referenceDelegate.updateLimboDocument(o,m))})),l.push(tg(o,a,t.documentUpdates).next((m=>{h=m.Bs,f=m.Ls}))),!r.isEqual(L.min())){const m=e.li.getLastRemoteSnapshotVersion(o).next((T=>e.li.setTargetsMetadata(o,o.currentSequenceNumber,r)));l.push(m)}return b.waitFor(l).next((()=>a.apply(o))).next((()=>e.localDocuments.getLocalViewOfDocuments(o,h,f))).next((()=>h))})).then((o=>(e.vs=s,o)))}function tg(n,t,e){let r=q(),s=q();return e.forEach((o=>r=r.add(o))),t.getEntries(n,r).next((o=>{let a=zt();return e.forEach(((l,h)=>{const f=o.get(l);h.isFoundDocument()!==f.isFoundDocument()&&(s=s.add(l)),h.isNoDocument()&&h.version.isEqual(L.min())?(t.removeEntry(l,h.readTime),a=a.insert(l,h)):!f.isValidDocument()||h.version.compareTo(f.version)>0||h.version.compareTo(f.version)===0&&f.hasPendingWrites?(t.addEntry(h),a=a.insert(l,h)):D(wi,"Ignoring outdated watch update for ",l,". Current version:",f.version," Watch version:",h.version)})),{Bs:a,Ls:s}}))}function eg(n,t){const e=F(n);return e.persistence.runTransaction("Get next mutation batch","readonly",(r=>(t===void 0&&(t=ui),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t))))}function ng(n,t){const e=F(n);return e.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return e.li.getTargetData(r,t).next((o=>o?(s=o,b.resolve(s)):e.li.allocateTargetId(r).next((a=>(s=new Jt(t,a,"TargetPurposeListen",r.currentSequenceNumber),e.li.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=e.vs.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.vs=e.vs.insert(r.targetId,r),e.Fs.set(t,r.targetId)),r}))}async function Gs(n,t,e){const r=F(n),s=r.vs.get(t),o=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",o,(a=>r.persistence.referenceDelegate.removeTarget(a,s)))}catch(a){if(!Qe(a))throw a;D(wi,`Failed to update sequence numbers for target ${t}: ${a}`)}r.vs=r.vs.remove(t),r.Fs.delete(s.target)}function Ba(n,t,e){const r=F(n);let s=L.min(),o=q();return r.persistence.runTransaction("Execute query","readwrite",(a=>(function(h,f,m){const T=F(h),R=T.Fs.get(m);return R!==void 0?b.resolve(T.vs.get(R)):T.li.getTargetData(f,m)})(r,a,Mt(t)).next((l=>{if(l)return s=l.lastLimboFreeSnapshotVersion,r.li.getMatchingKeysForTargetId(a,l.targetId).next((h=>{o=h}))})).next((()=>r.Cs.getDocumentsMatchingQuery(a,t,e?s:L.min(),e?o:q()))).next((l=>(rg(r,qm(t),l),{documents:l,ks:o})))))}function rg(n,t,e){let r=n.Ms.get(t)||L.min();e.forEach(((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)})),n.Ms.set(t,r)}class qa{constructor(){this.activeTargetIds=Km()}Qs(t){this.activeTargetIds=this.activeTargetIds.add(t)}Gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Ws(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class sg{constructor(){this.vo=new qa,this.Fo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t,e=!0){return e&&this.vo.Qs(t),this.Fo[t]||"not-current"}updateQueryState(t,e,r){this.Fo[t]=e}removeLocalQueryTarget(t){this.vo.Gs(t)}isLocalQueryTarget(t){return this.vo.activeTargetIds.has(t)}clearQueryState(t){delete this.Fo[t]}getAllActiveQueryTargets(){return this.vo.activeTargetIds}isActiveQueryTarget(t){return this.vo.activeTargetIds.has(t)}start(){return this.vo=new qa,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig{Mo(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ja="ConnectivityMonitor";class $a{constructor(){this.xo=()=>this.Oo(),this.No=()=>this.Bo(),this.Lo=[],this.ko()}Mo(t){this.Lo.push(t)}shutdown(){window.removeEventListener("online",this.xo),window.removeEventListener("offline",this.No)}ko(){window.addEventListener("online",this.xo),window.addEventListener("offline",this.No)}Oo(){D(ja,"Network connectivity changed: AVAILABLE");for(const t of this.Lo)t(0)}Bo(){D(ja,"Network connectivity changed: UNAVAILABLE");for(const t of this.Lo)t(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let or=null;function Hs(){return or===null?or=(function(){return 268435456+Math.round(2147483648*Math.random())})():or++,"0x"+or.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rs="RestConnection",og={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class ag{get qo(){return!1}constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const e=t.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Ko=e+"://"+t.host,this.Uo=`projects/${r}/databases/${s}`,this.$o=this.databaseId.database===yr?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Wo(t,e,r,s,o){const a=Hs(),l=this.Qo(t,e.toUriEncodedString());D(Rs,`Sending RPC '${t}' ${a}:`,l,r);const h={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.$o};this.Go(h,s,o);const{host:f}=new URL(l),m=pc(f);return this.zo(t,l,h,r,m).then((T=>(D(Rs,`Received RPC '${t}' ${a}: `,T),T)),(T=>{throw Re(Rs,`RPC '${t}' ${a} failed with error: `,T,"url: ",l,"request:",r),T}))}jo(t,e,r,s,o,a){return this.Wo(t,e,r,s,o)}Go(t,e,r){t["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Ke})(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e&&e.headers.forEach(((s,o)=>t[o]=s)),r&&r.headers.forEach(((s,o)=>t[o]=s))}Qo(t,e){const r=og[t];let s=`${this.Ko}/v1/${e}:${r}`;return this.databaseInfo.apiKey&&(s=`${s}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),s}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cg{constructor(t){this.Jo=t.Jo,this.Ho=t.Ho}Zo(t){this.Xo=t}Yo(t){this.e_=t}t_(t){this.n_=t}onMessage(t){this.r_=t}close(){this.Ho()}send(t){this.Jo(t)}i_(){this.Xo()}s_(){this.e_()}o_(t){this.n_(t)}__(t){this.r_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pt="WebChannelConnection",pn=(n,t,e)=>{n.listen(t,(r=>{try{e(r)}catch(s){setTimeout((()=>{throw s}),0)}}))};class Ue extends ag{constructor(t){super(t),this.a_=[],this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}static u_(){if(!Ue.c_){const t=Kc();pn(t,Hc.STAT_EVENT,(e=>{e.stat===Os.PROXY?D(pt,"STAT_EVENT: detected buffering proxy"):e.stat===Os.NOPROXY&&D(pt,"STAT_EVENT: detected no buffering proxy")})),Ue.c_=!0}}zo(t,e,r,s,o){const a=Hs();return new Promise(((l,h)=>{const f=new zc;f.setWithCredentials(!0),f.listenOnce(Gc.COMPLETE,(()=>{try{switch(f.getLastErrorCode()){case ar.NO_ERROR:const T=f.getResponseJson();D(pt,`XHR for RPC '${t}' ${a} received:`,JSON.stringify(T)),l(T);break;case ar.TIMEOUT:D(pt,`RPC '${t}' ${a} timed out`),h(new V(S.DEADLINE_EXCEEDED,"Request time out"));break;case ar.HTTP_ERROR:const R=f.getStatus();if(D(pt,`RPC '${t}' ${a} failed with status:`,R,"response text:",f.getResponseText()),R>0){let P=f.getResponseJson();Array.isArray(P)&&(P=P[0]);const N=P==null?void 0:P.error;if(N&&N.status&&N.message){const M=(function(K){const G=K.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(G)>=0?G:S.UNKNOWN})(N.status);h(new V(M,N.message))}else h(new V(S.UNKNOWN,"Server responded with status "+f.getStatus()))}else h(new V(S.UNAVAILABLE,"Connection failed."));break;default:x(9055,{l_:t,streamId:a,h_:f.getLastErrorCode(),P_:f.getLastError()})}}finally{D(pt,`RPC '${t}' ${a} completed.`)}}));const m=JSON.stringify(s);D(pt,`RPC '${t}' ${a} sending request:`,s),f.send(e,"POST",m,r,15)}))}T_(t,e,r){const s=Hs(),o=[this.Ko,"/","google.firestore.v1.Firestore","/",t,"/channel"],a=this.createWebChannelTransport(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.Go(l.initMessageHeaders,e,r),l.encodeInitMessageHeaders=!0;const f=o.join("");D(pt,`Creating RPC '${t}' stream ${s}: ${f}`,l);const m=a.createWebChannel(f,l);this.E_(m);let T=!1,R=!1;const P=new cg({Jo:N=>{R?D(pt,`Not sending because RPC '${t}' stream ${s} is closed:`,N):(T||(D(pt,`Opening RPC '${t}' stream ${s} transport.`),m.open(),T=!0),D(pt,`RPC '${t}' stream ${s} sending:`,N),m.send(N))},Ho:()=>m.close()});return pn(m,gn.EventType.OPEN,(()=>{R||(D(pt,`RPC '${t}' stream ${s} transport opened.`),P.i_())})),pn(m,gn.EventType.CLOSE,(()=>{R||(R=!0,D(pt,`RPC '${t}' stream ${s} transport closed`),P.o_(),this.I_(m))})),pn(m,gn.EventType.ERROR,(N=>{R||(R=!0,Re(pt,`RPC '${t}' stream ${s} transport errored. Name:`,N.name,"Message:",N.message),P.o_(new V(S.UNAVAILABLE,"The operation could not be completed")))})),pn(m,gn.EventType.MESSAGE,(N=>{var M;if(!R){const k=N.data[0];z(!!k,16349);const K=k,G=(K==null?void 0:K.error)||((M=K[0])==null?void 0:M.error);if(G){D(pt,`RPC '${t}' stream ${s} received error:`,G);const X=G.status;let Rt=(function(E){const p=et[E];if(p!==void 0)return Cu(p)})(X),ft=G.message;X==="NOT_FOUND"&&ft.includes("database")&&ft.includes("does not exist")&&ft.includes(this.databaseId.database)&&Re(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),Rt===void 0&&(Rt=S.INTERNAL,ft="Unknown error status: "+X+" with message "+G.message),R=!0,P.o_(new V(Rt,ft)),m.close()}else D(pt,`RPC '${t}' stream ${s} received:`,k),P.__(k)}})),Ue.u_(),setTimeout((()=>{P.s_()}),0),P}terminate(){this.a_.forEach((t=>t.close())),this.a_=[]}E_(t){this.a_.push(t)}I_(t){this.a_=this.a_.filter((e=>e===t))}Go(t,e,r){super.Go(t,e,r),this.databaseInfo.apiKey&&(t["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Wc()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ug(n){return new Ue(n)}function Ss(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qr(n){return new dp(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ue.c_=!1;class zu{constructor(t,e,r=1e3,s=1.5,o=6e4){this.Ci=t,this.timerId=e,this.R_=r,this.A_=s,this.V_=o,this.d_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.d_=0}g_(){this.d_=this.V_}p_(t){this.cancel();const e=Math.floor(this.d_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,e-r);s>0&&D("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.d_} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.m_=this.Ci.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),t()))),this.d_*=this.A_,this.d_<this.R_&&(this.d_=this.R_),this.d_>this.V_&&(this.d_=this.V_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.d_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const za="PersistentStream";class Gu{constructor(t,e,r,s,o,a,l,h){this.Ci=t,this.S_=r,this.b_=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=l,this.listener=h,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new zu(t,e)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Ci.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(t){this.K_(),this.stream.send(t)}async k_(){if(this.O_())return this.close(0)}K_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(t,e){this.K_(),this.U_(),this.M_.cancel(),this.D_++,t!==4?this.M_.reset():e&&e.code===S.RESOURCE_EXHAUSTED?($t(e.toString()),$t("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):e&&e.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.W_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.t_(e)}W_(){}auth(){this.state=1;const t=this.Q_(this.D_),e=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===e&&this.G_(r,s)}),(r=>{t((()=>{const s=new V(S.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(t,e){const r=this.Q_(this.D_);this.stream=this.j_(t,e),this.stream.Zo((()=>{r((()=>this.listener.Zo()))})),this.stream.Yo((()=>{r((()=>(this.state=2,this.v_=this.Ci.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.Yo())))})),this.stream.t_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(t){return D(za,`close with error: ${t}`),this.stream=null,this.close(4,t)}Q_(t){return e=>{this.Ci.enqueueAndForget((()=>this.D_===t?e():(D(za,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class lg extends Gu{constructor(t,e,r,s,o,a){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}j_(t,e){return this.connection.T_("Listen",t,e)}J_(t){return this.onNext(t)}onNext(t){this.M_.reset();const e=gp(this.serializer,t),r=(function(o){if(!("targetChange"in o))return L.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?L.min():a.readTime?xt(a.readTime):L.min()})(t);return this.listener.H_(e,r)}Z_(t){const e={};e.database=zs(this.serializer),e.addTarget=(function(o,a){let l;const h=a.target;if(l=Us(h)?{documents:Ep(o,h)}:{query:Tp(o,h).ft},l.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){l.resumeToken=Nu(o,a.resumeToken);const f=qs(o,a.expectedCount);f!==null&&(l.expectedCount=f)}else if(a.snapshotVersion.compareTo(L.min())>0){l.readTime=vr(o,a.snapshotVersion.toTimestamp());const f=qs(o,a.expectedCount);f!==null&&(l.expectedCount=f)}return l})(this.serializer,t);const r=wp(this.serializer,t);r&&(e.labels=r),this.q_(e)}X_(t){const e={};e.database=zs(this.serializer),e.removeTarget=t,this.q_(e)}}class hg extends Gu{constructor(t,e,r,s,o,a){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,a),this.serializer=o}get Y_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}W_(){this.Y_&&this.ea([])}j_(t,e){return this.connection.T_("Write",t,e)}J_(t){return z(!!t.streamToken,31322),this.lastStreamToken=t.streamToken,z(!t.writeResults||t.writeResults.length===0,55816),this.listener.ta()}onNext(t){z(!!t.streamToken,12678),this.lastStreamToken=t.streamToken,this.M_.reset();const e=yp(t.writeResults,t.commitTime),r=xt(t.commitTime);return this.listener.na(r,e)}ra(){const t={};t.database=zs(this.serializer),this.q_(t)}ea(t){const e={streamToken:this.lastStreamToken,writes:t.map((r=>_p(this.serializer,r)))};this.q_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fg{}class dg extends fg{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new V(S.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(t,e,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection.Wo(t,js(e,r),s,o,a))).catch((o=>{throw o.name==="FirebaseError"?(o.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new V(S.UNKNOWN,o.toString())}))}jo(t,e,r,s,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([a,l])=>this.connection.jo(t,js(e,r),s,a,l,o))).catch((a=>{throw a.name==="FirebaseError"?(a.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new V(S.UNKNOWN,a.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}function mg(n,t,e,r){return new dg(n,t,e,r)}class pg{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(t){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.ca("Offline")))}set(t){this.Pa(),this.oa=0,t==="Online"&&(this.aa=!1),this.ca(t)}ca(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}la(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?($t(e),this.aa=!1):D("OnlineStateTracker",e)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Se="RemoteStore";class gg{constructor(t,e,r,s,o){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ea=new Map,this.Ia=new Set,this.Ra=[],this.Aa=o,this.Aa.Mo((a=>{r.enqueueAndForget((async()=>{Ve(this)&&(D(Se,"Restarting streams for network reachability change."),await(async function(h){const f=F(h);f.Ia.add(4),await Un(f),f.Va.set("Unknown"),f.Ia.delete(4),await jr(f)})(this))}))})),this.Va=new pg(r,s)}}async function jr(n){if(Ve(n))for(const t of n.Ra)await t(!0)}async function Un(n){for(const t of n.Ra)await t(!1)}function Hu(n,t){const e=F(n);e.Ea.has(t.targetId)||(e.Ea.set(t.targetId,t),Si(e)?Ri(e):Je(e).O_()&&Ai(e,t))}function vi(n,t){const e=F(n),r=Je(e);e.Ea.delete(t),r.O_()&&Ku(e,t),e.Ea.size===0&&(r.O_()?r.L_():Ve(e)&&e.Va.set("Unknown"))}function Ai(n,t){if(n.da.$e(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(L.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}Je(n).Z_(t)}function Ku(n,t){n.da.$e(t),Je(n).X_(t)}function Ri(n){n.da=new up({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),At:t=>n.Ea.get(t)||null,ht:()=>n.datastore.serializer.databaseId}),Je(n).start(),n.Va.ua()}function Si(n){return Ve(n)&&!Je(n).x_()&&n.Ea.size>0}function Ve(n){return F(n).Ia.size===0}function Wu(n){n.da=void 0}async function _g(n){n.Va.set("Online")}async function yg(n){n.Ea.forEach(((t,e)=>{Ai(n,t)}))}async function Eg(n,t){Wu(n),Si(n)?(n.Va.ha(t),Ri(n)):n.Va.set("Unknown")}async function Tg(n,t,e){if(n.Va.set("Online"),t instanceof Du&&t.state===2&&t.cause)try{await(async function(s,o){const a=o.cause;for(const l of o.targetIds)s.Ea.has(l)&&(await s.remoteSyncer.rejectListen(l,a),s.Ea.delete(l),s.da.removeTarget(l))})(n,t)}catch(r){D(Se,"Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Rr(n,r)}else if(t instanceof hr?n.da.Xe(t):t instanceof Vu?n.da.st(t):n.da.tt(t),!e.isEqual(L.min()))try{const r=await $u(n.localStore);e.compareTo(r)>=0&&await(function(o,a){const l=o.da.Tt(a);return l.targetChanges.forEach(((h,f)=>{if(h.resumeToken.approximateByteSize()>0){const m=o.Ea.get(f);m&&o.Ea.set(f,m.withResumeToken(h.resumeToken,a))}})),l.targetMismatches.forEach(((h,f)=>{const m=o.Ea.get(h);if(!m)return;o.Ea.set(h,m.withResumeToken(ht.EMPTY_BYTE_STRING,m.snapshotVersion)),Ku(o,h);const T=new Jt(m.target,h,f,m.sequenceNumber);Ai(o,T)})),o.remoteSyncer.applyRemoteEvent(l)})(n,e)}catch(r){D(Se,"Failed to raise snapshot:",r),await Rr(n,r)}}async function Rr(n,t,e){if(!Qe(t))throw t;n.Ia.add(1),await Un(n),n.Va.set("Offline"),e||(e=()=>$u(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{D(Se,"Retrying IndexedDB access"),await e(),n.Ia.delete(1),await jr(n)}))}function Qu(n,t){return t().catch((e=>Rr(n,e,t)))}async function $r(n){const t=F(n),e=ae(t);let r=t.Ta.length>0?t.Ta[t.Ta.length-1].batchId:ui;for(;Ig(t);)try{const s=await eg(t.localStore,r);if(s===null){t.Ta.length===0&&e.L_();break}r=s.batchId,wg(t,s)}catch(s){await Rr(t,s)}Yu(t)&&Ju(t)}function Ig(n){return Ve(n)&&n.Ta.length<10}function wg(n,t){n.Ta.push(t);const e=ae(n);e.O_()&&e.Y_&&e.ea(t.mutations)}function Yu(n){return Ve(n)&&!ae(n).x_()&&n.Ta.length>0}function Ju(n){ae(n).start()}async function vg(n){ae(n).ra()}async function Ag(n){const t=ae(n);for(const e of n.Ta)t.ea(e.mutations)}async function Rg(n,t,e){const r=n.Ta.shift(),s=gi.from(r,t,e);await Qu(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await $r(n)}async function Sg(n,t){t&&ae(n).Y_&&await(async function(r,s){if((function(a){return op(a)&&a!==S.ABORTED})(s.code)){const o=r.Ta.shift();ae(r).B_(),await Qu(r,(()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s))),await $r(r)}})(n,t),Yu(n)&&Ju(n)}async function Ga(n,t){const e=F(n);e.asyncQueue.verifyOperationInProgress(),D(Se,"RemoteStore received new credentials");const r=Ve(e);e.Ia.add(3),await Un(e),r&&e.Va.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.Ia.delete(3),await jr(e)}async function bg(n,t){const e=F(n);t?(e.Ia.delete(2),await jr(e)):t||(e.Ia.add(2),await Un(e),e.Va.set("Unknown"))}function Je(n){return n.ma||(n.ma=(function(e,r,s){const o=F(e);return o.sa(),new lg(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)})(n.datastore,n.asyncQueue,{Zo:_g.bind(null,n),Yo:yg.bind(null,n),t_:Eg.bind(null,n),H_:Tg.bind(null,n)}),n.Ra.push((async t=>{t?(n.ma.B_(),Si(n)?Ri(n):n.Va.set("Unknown")):(await n.ma.stop(),Wu(n))}))),n.ma}function ae(n){return n.fa||(n.fa=(function(e,r,s){const o=F(e);return o.sa(),new hg(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)})(n.datastore,n.asyncQueue,{Zo:()=>Promise.resolve(),Yo:vg.bind(null,n),t_:Sg.bind(null,n),ta:Ag.bind(null,n),na:Rg.bind(null,n)}),n.Ra.push((async t=>{t?(n.fa.B_(),await $r(n)):(await n.fa.stop(),n.Ta.length>0&&(D(Se,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bi{constructor(t,e,r,s,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new Te,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((a=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,o){const a=Date.now()+r,l=new bi(t,e,a,s,o);return l.start(r),l}start(t){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new V(S.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((t=>this.deferred.resolve(t)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Pi(n,t){if($t("AsyncQueue",`${t}: ${n}`),Qe(n))return new V(S.UNAVAILABLE,`${t}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{static emptySet(t){return new Be(t.comparator)}constructor(t){this.comparator=t?(e,r)=>t(e,r)||O.comparator(e.key,r.key):(e,r)=>O.comparator(e.key,r.key),this.keyedMap=_n(),this.sortedSet=new J(this.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal(((e,r)=>(t(e),!1)))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof Be)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const t=[];return this.forEach((e=>{t.push(e.toString())})),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new Be;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ha{constructor(){this.ga=new J(O.comparator)}track(t){const e=t.doc.key,r=this.ga.get(e);r?t.type!==0&&r.type===3?this.ga=this.ga.insert(e,t):t.type===3&&r.type!==1?this.ga=this.ga.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.ga=this.ga.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.ga=this.ga.remove(e):t.type===1&&r.type===2?this.ga=this.ga.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.ga=this.ga.insert(e,{type:2,doc:t.doc}):x(63341,{Vt:t,pa:r}):this.ga=this.ga.insert(e,t)}ya(){const t=[];return this.ga.inorderTraversal(((e,r)=>{t.push(r)})),t}}class He{constructor(t,e,r,s,o,a,l,h,f){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=l,this.excludesMetadataChanges=h,this.hasCachedResults=f}static fromInitialDocuments(t,e,r,s,o){const a=[];return e.forEach((l=>{a.push({type:0,doc:l})})),new He(t,e,Be.emptySet(e),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&xr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pg{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((t=>t.Da()))}}class Cg{constructor(){this.queries=Ka(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(e,r){const s=F(e),o=s.queries;s.queries=Ka(),o.forEach(((a,l)=>{for(const h of l.Sa)h.onError(r)}))})(this,new V(S.ABORTED,"Firestore shutting down"))}}function Ka(){return new Pe((n=>gu(n)),xr)}async function Vg(n,t){const e=F(n);let r=3;const s=t.query;let o=e.queries.get(s);o?!o.ba()&&t.Da()&&(r=2):(o=new Pg,r=t.Da()?0:1);try{switch(r){case 0:o.wa=await e.onListen(s,!0);break;case 1:o.wa=await e.onListen(s,!1);break;case 2:await e.onFirstRemoteStoreListen(s)}}catch(a){const l=Pi(a,`Initialization of query '${Me(t.query)}' failed`);return void t.onError(l)}e.queries.set(s,o),o.Sa.push(t),t.va(e.onlineState),o.wa&&t.Fa(o.wa)&&Ci(e)}async function Dg(n,t){const e=F(n),r=t.query;let s=3;const o=e.queries.get(r);if(o){const a=o.Sa.indexOf(t);a>=0&&(o.Sa.splice(a,1),o.Sa.length===0?s=t.Da()?0:1:!o.ba()&&t.Da()&&(s=2))}switch(s){case 0:return e.queries.delete(r),e.onUnlisten(r,!0);case 1:return e.queries.delete(r),e.onUnlisten(r,!1);case 2:return e.onLastRemoteStoreUnlisten(r);default:return}}function Ng(n,t){const e=F(n);let r=!1;for(const s of t){const o=s.query,a=e.queries.get(o);if(a){for(const l of a.Sa)l.Fa(s)&&(r=!0);a.wa=s}}r&&Ci(e)}function kg(n,t,e){const r=F(n),s=r.queries.get(t);if(s)for(const o of s.Sa)o.onError(e);r.queries.delete(t)}function Ci(n){n.Ca.forEach((t=>{t.next()}))}var Ks,Wa;(Wa=Ks||(Ks={})).Ma="default",Wa.Cache="cache";class Og{constructor(t,e,r){this.query=t,this.xa=e,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new He(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.Oa?this.Ba(t)&&(this.xa.next(t),e=!0):this.La(t,this.onlineState)&&(this.ka(t),e=!0),this.Na=t,e}onError(t){this.xa.error(t)}va(t){this.onlineState=t;let e=!1;return this.Na&&!this.Oa&&this.La(this.Na,t)&&(this.ka(this.Na),e=!0),e}La(t,e){if(!t.fromCache||!this.Da())return!0;const r=e!=="Offline";return(!this.options.qa||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}Ba(t){if(t.docChanges.length>0)return!0;const e=this.Na&&this.Na.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}ka(t){t=He.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.Oa=!0,this.xa.next(t)}Da(){return this.options.source!==Ks.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xu{constructor(t){this.key=t}}class Zu{constructor(t){this.key=t}}class Mg{constructor(t,e){this.query=t,this.Za=e,this.Xa=null,this.hasCachedResults=!1,this.current=!1,this.Ya=q(),this.mutatedKeys=q(),this.eu=_u(t),this.tu=new Be(this.eu)}get nu(){return this.Za}ru(t,e){const r=e?e.iu:new Ha,s=e?e.tu:this.tu;let o=e?e.mutatedKeys:this.mutatedKeys,a=s,l=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,f=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal(((m,T)=>{const R=s.get(m),P=Lr(this.query,T)?T:null,N=!!R&&this.mutatedKeys.has(R.key),M=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let k=!1;R&&P?R.data.isEqual(P.data)?N!==M&&(r.track({type:3,doc:P}),k=!0):this.su(R,P)||(r.track({type:2,doc:P}),k=!0,(h&&this.eu(P,h)>0||f&&this.eu(P,f)<0)&&(l=!0)):!R&&P?(r.track({type:0,doc:P}),k=!0):R&&!P&&(r.track({type:1,doc:R}),k=!0,(h||f)&&(l=!0)),k&&(P?(a=a.add(P),o=M?o.add(m):o.delete(m)):(a=a.delete(m),o=o.delete(m)))})),this.query.limit!==null)for(;a.size>this.query.limit;){const m=this.query.limitType==="F"?a.last():a.first();a=a.delete(m.key),o=o.delete(m.key),r.track({type:1,doc:m})}return{tu:a,iu:r,bs:l,mutatedKeys:o}}su(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const o=this.tu;this.tu=t.tu,this.mutatedKeys=t.mutatedKeys;const a=t.iu.ya();a.sort(((m,T)=>(function(P,N){const M=k=>{switch(k){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return x(20277,{Vt:k})}};return M(P)-M(N)})(m.type,T.type)||this.eu(m.doc,T.doc))),this.ou(r),s=s??!1;const l=e&&!s?this._u():[],h=this.Ya.size===0&&this.current&&!s?1:0,f=h!==this.Xa;return this.Xa=h,a.length!==0||f?{snapshot:new He(this.query,t.tu,o,a,t.mutatedKeys,h===0,f,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:l}:{au:l}}va(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Ha,mutatedKeys:this.mutatedKeys,bs:!1},!1)):{au:[]}}uu(t){return!this.Za.has(t)&&!!this.tu.has(t)&&!this.tu.get(t).hasLocalMutations}ou(t){t&&(t.addedDocuments.forEach((e=>this.Za=this.Za.add(e))),t.modifiedDocuments.forEach((e=>{})),t.removedDocuments.forEach((e=>this.Za=this.Za.delete(e))),this.current=t.current)}_u(){if(!this.current)return[];const t=this.Ya;this.Ya=q(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Ya=this.Ya.add(r.key))}));const e=[];return t.forEach((r=>{this.Ya.has(r)||e.push(new Zu(r))})),this.Ya.forEach((r=>{t.has(r)||e.push(new Xu(r))})),e}cu(t){this.Za=t.ks,this.Ya=q();const e=this.ru(t.documents);return this.applyChanges(e,!0)}lu(){return He.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Xa===0,this.hasCachedResults)}}const Vi="SyncEngine";class xg{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class Lg{constructor(t){this.key=t,this.hu=!1}}class Fg{constructor(t,e,r,s,o,a){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new Pe((l=>gu(l)),xr),this.Eu=new Map,this.Iu=new Set,this.Ru=new J(O.comparator),this.Au=new Map,this.Vu=new Ei,this.du={},this.mu=new Map,this.fu=Ge.ar(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Ug(n,t,e=!0){const r=il(n);let s;const o=r.Tu.get(t);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.lu()):s=await tl(r,t,e,!0),s}async function Bg(n,t){const e=il(n);await tl(e,t,!0,!1)}async function tl(n,t,e,r){const s=await ng(n.localStore,Mt(t)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,e);let l;return r&&(l=await qg(n,t,o,a==="current",s.resumeToken)),n.isPrimaryClient&&e&&Hu(n.remoteStore,s),l}async function qg(n,t,e,r,s){n.pu=(T,R,P)=>(async function(M,k,K,G){let X=k.view.ru(K);X.bs&&(X=await Ba(M.localStore,k.query,!1).then((({documents:E})=>k.view.ru(E,X))));const Rt=G&&G.targetChanges.get(k.targetId),ft=G&&G.targetMismatches.get(k.targetId)!=null,dt=k.view.applyChanges(X,M.isPrimaryClient,Rt,ft);return Ya(M,k.targetId,dt.au),dt.snapshot})(n,T,R,P);const o=await Ba(n.localStore,t,!0),a=new Mg(t,o.ks),l=a.ru(o.documents),h=Fn.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),f=a.applyChanges(l,n.isPrimaryClient,h);Ya(n,e,f.au);const m=new xg(t,e,a);return n.Tu.set(t,m),n.Eu.has(e)?n.Eu.get(e).push(t):n.Eu.set(e,[t]),f.snapshot}async function jg(n,t,e){const r=F(n),s=r.Tu.get(t),o=r.Eu.get(s.targetId);if(o.length>1)return r.Eu.set(s.targetId,o.filter((a=>!xr(a,t)))),void r.Tu.delete(t);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await Gs(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),e&&vi(r.remoteStore,s.targetId),Ws(r,s.targetId)})).catch(We)):(Ws(r,s.targetId),await Gs(r.localStore,s.targetId,!0))}async function $g(n,t){const e=F(n),r=e.Tu.get(t),s=e.Eu.get(r.targetId);e.isPrimaryClient&&s.length===1&&(e.sharedClientState.removeLocalQueryTarget(r.targetId),vi(e.remoteStore,r.targetId))}async function zg(n,t,e){const r=Jg(n);try{const s=await(function(a,l){const h=F(a),f=Y.now(),m=l.reduce(((P,N)=>P.add(N.key)),q());let T,R;return h.persistence.runTransaction("Locally write mutations","readwrite",(P=>{let N=zt(),M=q();return h.xs.getEntries(P,m).next((k=>{N=k,N.forEach(((K,G)=>{G.isValidDocument()||(M=M.add(K))}))})).next((()=>h.localDocuments.getOverlayedDocuments(P,N))).next((k=>{T=k;const K=[];for(const G of l){const X=ep(G,T.get(G.key).overlayedDocument);X!=null&&K.push(new Ce(G.key,X,cu(X.value.mapValue),Bt.exists(!0)))}return h.mutationQueue.addMutationBatch(P,f,K,l)})).next((k=>{R=k;const K=k.applyToLocalDocumentSet(T,M);return h.documentOverlayCache.saveOverlays(P,k.batchId,K)}))})).then((()=>({batchId:R.batchId,changes:Eu(T)})))})(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),(function(a,l,h){let f=a.du[a.currentUser.toKey()];f||(f=new J(B)),f=f.insert(l,h),a.du[a.currentUser.toKey()]=f})(r,s.batchId,e),await Bn(r,s.changes),await $r(r.remoteStore)}catch(s){const o=Pi(s,"Failed to persist write");e.reject(o)}}async function el(n,t){const e=F(n);try{const r=await Zp(e.localStore,t);t.targetChanges.forEach(((s,o)=>{const a=e.Au.get(o);a&&(z(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?z(a.hu,14607):s.removedDocuments.size>0&&(z(a.hu,42227),a.hu=!1))})),await Bn(e,r,t)}catch(r){await We(r)}}function Qa(n,t,e){const r=F(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.Tu.forEach(((o,a)=>{const l=a.view.va(t);l.snapshot&&s.push(l.snapshot)})),(function(a,l){const h=F(a);h.onlineState=l;let f=!1;h.queries.forEach(((m,T)=>{for(const R of T.Sa)R.va(l)&&(f=!0)})),f&&Ci(h)})(r.eventManager,t),s.length&&r.Pu.H_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Gg(n,t,e){const r=F(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.Au.get(t),o=s&&s.key;if(o){let a=new J(O.comparator);a=a.insert(o,_t.newNoDocument(o,L.min()));const l=q().add(o),h=new Br(L.min(),new Map,new J(B),a,l);await el(r,h),r.Ru=r.Ru.remove(o),r.Au.delete(t),Di(r)}else await Gs(r.localStore,t,!1).then((()=>Ws(r,t,e))).catch(We)}async function Hg(n,t){const e=F(n),r=t.batch.batchId;try{const s=await Xp(e.localStore,t);rl(e,r,null),nl(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await Bn(e,s)}catch(s){await We(s)}}async function Kg(n,t,e){const r=F(n);try{const s=await(function(a,l){const h=F(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",(f=>{let m;return h.mutationQueue.lookupMutationBatch(f,l).next((T=>(z(T!==null,37113),m=T.keys(),h.mutationQueue.removeMutationBatch(f,T)))).next((()=>h.mutationQueue.performConsistencyCheck(f))).next((()=>h.documentOverlayCache.removeOverlaysForBatchId(f,m,l))).next((()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,m))).next((()=>h.localDocuments.getDocuments(f,m)))}))})(r.localStore,t);rl(r,t,e),nl(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await Bn(r,s)}catch(s){await We(s)}}function nl(n,t){(n.mu.get(t)||[]).forEach((e=>{e.resolve()})),n.mu.delete(t)}function rl(n,t,e){const r=F(n);let s=r.du[r.currentUser.toKey()];if(s){const o=s.get(t);o&&(e?o.reject(e):o.resolve(),s=s.remove(t)),r.du[r.currentUser.toKey()]=s}}function Ws(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.Eu.get(t))n.Tu.delete(r),e&&n.Pu.yu(r,e);n.Eu.delete(t),n.isPrimaryClient&&n.Vu.Gr(t).forEach((r=>{n.Vu.containsKey(r)||sl(n,r)}))}function sl(n,t){n.Iu.delete(t.path.canonicalString());const e=n.Ru.get(t);e!==null&&(vi(n.remoteStore,e),n.Ru=n.Ru.remove(t),n.Au.delete(e),Di(n))}function Ya(n,t,e){for(const r of e)r instanceof Xu?(n.Vu.addReference(r.key,t),Wg(n,r)):r instanceof Zu?(D(Vi,"Document no longer in limbo: "+r.key),n.Vu.removeReference(r.key,t),n.Vu.containsKey(r.key)||sl(n,r.key)):x(19791,{wu:r})}function Wg(n,t){const e=t.key,r=e.path.canonicalString();n.Ru.get(e)||n.Iu.has(r)||(D(Vi,"New document in limbo: "+e),n.Iu.add(r),Di(n))}function Di(n){for(;n.Iu.size>0&&n.Ru.size<n.maxConcurrentLimboResolutions;){const t=n.Iu.values().next().value;n.Iu.delete(t);const e=new O(W.fromString(t)),r=n.fu.next();n.Au.set(r,new Lg(e)),n.Ru=n.Ru.insert(e,r),Hu(n.remoteStore,new Jt(Mt(mi(e.path)),r,"TargetPurposeLimboResolution",kr.ce))}}async function Bn(n,t,e){const r=F(n),s=[],o=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach(((l,h)=>{a.push(r.pu(h,t,e).then((f=>{var m;if((f||e)&&r.isPrimaryClient){const T=f?!f.fromCache:(m=e==null?void 0:e.targetChanges.get(h.targetId))==null?void 0:m.current;r.sharedClientState.updateQueryState(h.targetId,T?"current":"not-current")}if(f){s.push(f);const T=Ii.Is(h.targetId,f);o.push(T)}})))})),await Promise.all(a),r.Pu.H_(s),await(async function(h,f){const m=F(h);try{await m.persistence.runTransaction("notifyLocalViewChanges","readwrite",(T=>b.forEach(f,(R=>b.forEach(R.Ts,(P=>m.persistence.referenceDelegate.addReference(T,R.targetId,P))).next((()=>b.forEach(R.Es,(P=>m.persistence.referenceDelegate.removeReference(T,R.targetId,P)))))))))}catch(T){if(!Qe(T))throw T;D(wi,"Failed to update sequence numbers: "+T)}for(const T of f){const R=T.targetId;if(!T.fromCache){const P=m.vs.get(R),N=P.snapshotVersion,M=P.withLastLimboFreeSnapshotVersion(N);m.vs=m.vs.insert(R,M)}}})(r.localStore,o))}async function Qg(n,t){const e=F(n);if(!e.currentUser.isEqual(t)){D(Vi,"User change. New user:",t.toKey());const r=await ju(e.localStore,t);e.currentUser=t,(function(o,a){o.mu.forEach((l=>{l.forEach((h=>{h.reject(new V(S.CANCELLED,a))}))})),o.mu.clear()})(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await Bn(e,r.Ns)}}function Yg(n,t){const e=F(n),r=e.Au.get(t);if(r&&r.hu)return q().add(r.key);{let s=q();const o=e.Eu.get(t);if(!o)return s;for(const a of o){const l=e.Tu.get(a);s=s.unionWith(l.view.nu)}return s}}function il(n){const t=F(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=el.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Yg.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Gg.bind(null,t),t.Pu.H_=Ng.bind(null,t.eventManager),t.Pu.yu=kg.bind(null,t.eventManager),t}function Jg(n){const t=F(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Hg.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Kg.bind(null,t),t}class Sr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=qr(t.databaseInfo.databaseId),this.sharedClientState=this.Du(t),this.persistence=this.Cu(t),await this.persistence.start(),this.localStore=this.vu(t),this.gcScheduler=this.Fu(t,this.localStore),this.indexBackfillerScheduler=this.Mu(t,this.localStore)}Fu(t,e){return null}Mu(t,e){return null}vu(t){return Jp(this.persistence,new Wp,t.initialUser,this.serializer)}Cu(t){return new qu(Ti.Vi,this.serializer)}Du(t){return new sg}async terminate(){var t,e;(t=this.gcScheduler)==null||t.stop(),(e=this.indexBackfillerScheduler)==null||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Sr.provider={build:()=>new Sr};class Xg extends Sr{constructor(t){super(),this.cacheSizeBytes=t}Fu(t,e){z(this.persistence.referenceDelegate instanceof Ar,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new kp(r,t.asyncQueue,e)}Cu(t){const e=this.cacheSizeBytes!==void 0?wt.withCacheSize(this.cacheSizeBytes):wt.DEFAULT;return new qu((r=>Ar.Vi(r,e)),this.serializer)}}class Qs{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Qa(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Qg.bind(null,this.syncEngine),await bg(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return(function(){return new Cg})()}createDatastore(t){const e=qr(t.databaseInfo.databaseId),r=ug(t.databaseInfo);return mg(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return(function(r,s,o,a,l){return new gg(r,s,o,a,l)})(this.localStore,this.datastore,t.asyncQueue,(e=>Qa(this.syncEngine,e,0)),(function(){return $a.v()?new $a:new ig})())}createSyncEngine(t,e){return(function(s,o,a,l,h,f,m){const T=new Fg(s,o,a,l,h,f);return m&&(T.gu=!0),T})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await(async function(s){const o=F(s);D(Se,"RemoteStore shutting down."),o.Ia.add(5),await Un(o),o.Aa.shutdown(),o.Va.set("Unknown")})(this.remoteStore),(t=this.datastore)==null||t.terminate(),(e=this.eventManager)==null||e.terminate()}}Qs.provider={build:()=>new Qs};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zg{constructor(t){this.observer=t,this.muted=!1}next(t){this.muted||this.observer.next&&this.Ou(this.observer.next,t)}error(t){this.muted||(this.observer.error?this.Ou(this.observer.error,t):$t("Uncaught Error in snapshot listener:",t.toString()))}Nu(){this.muted=!0}Ou(t,e){setTimeout((()=>{this.muted||t(e)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ce="FirestoreClient";class t_{constructor(t,e,r,s,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this._databaseInfo=s,this.user=gt.UNAUTHENTICATED,this.clientId=ci.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,(async a=>{D(ce,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a})),this.appCheckCredentials.start(r,(a=>(D(ce,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new Te;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Pi(e,"Failed to shutdown persistence");t.reject(r)}})),t.promise}}async function bs(n,t){n.asyncQueue.verifyOperationInProgress(),D(ce,"Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await ju(t.localStore,s),r=s)})),t.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=t}async function Ja(n,t){n.asyncQueue.verifyOperationInProgress();const e=await e_(n);D(ce,"Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener((r=>Ga(t.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Ga(t.remoteStore,s))),n._onlineComponents=t}async function e_(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){D(ce,"Using user provided OfflineComponentProvider");try{await bs(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!(function(s){return s.name==="FirebaseError"?s.code===S.FAILED_PRECONDITION||s.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(e))throw e;Re("Error using user provided cache. Falling back to memory cache: "+e),await bs(n,new Sr)}}else D(ce,"Using default OfflineComponentProvider"),await bs(n,new Xg(void 0));return n._offlineComponents}async function ol(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(D(ce,"Using user provided OnlineComponentProvider"),await Ja(n,n._uninitializedComponentsProvider._online)):(D(ce,"Using default OnlineComponentProvider"),await Ja(n,new Qs))),n._onlineComponents}function n_(n){return ol(n).then((t=>t.syncEngine))}async function Xa(n){const t=await ol(n),e=t.eventManager;return e.onListen=Ug.bind(null,t.syncEngine),e.onUnlisten=jg.bind(null,t.syncEngine),e.onFirstRemoteStoreListen=Bg.bind(null,t.syncEngine),e.onLastRemoteStoreUnlisten=$g.bind(null,t.syncEngine),e}function r_(n,t,e,r){const s=new Zg(r),o=new Og(t,s,e);return n.asyncQueue.enqueueAndForget((async()=>Vg(await Xa(n),o))),()=>{s.Nu(),n.asyncQueue.enqueueAndForget((async()=>Dg(await Xa(n),o)))}}function s_(n,t){const e=new Te;return n.asyncQueue.enqueueAndForget((async()=>zg(await n_(n),t,e))),e.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function al(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const i_="ComponentProvider",Za=new Map;function o_(n,t,e,r,s){return new wm(n,t,e,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,al(s.experimentalLongPollingOptions),s.useFetchStreams,s.isUsingEmulator,r)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cl="firestore.googleapis.com",tc=!0;class ec{constructor(t){if(t.host===void 0){if(t.ssl!==void 0)throw new V(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=cl,this.ssl=tc}else this.host=t.host,this.ssl=t.ssl??tc;if(this.isUsingEmulator=t.emulatorOptions!==void 0,this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=Bu;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<Dp)throw new V(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}hm("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=al(t.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new V(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class zr{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ec({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new V(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new V(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ec(t),this._emulatorOptions=t.emulatorOptions||{},t.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new em;switch(r.type){case"firstParty":return new im(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new V(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(t.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(e){const r=Za.get(e);r&&(D(i_,"Removing Datastore"),Za.delete(e),r.terminate())})(this),Promise.resolve()}}function a_(n,t,e,r={}){var f;n=Tn(n,zr);const s=pc(t),o=n._getSettings(),a={...o,emulatorOptions:n._getEmulatorOptions()},l=`${t}:${e}`;s&&Th(`https://${l}`),o.host!==cl&&o.host!==l&&Re("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...o,host:l,ssl:s,emulatorOptions:r};if(!Rn(h,a)&&(n._setSettings(h),r.mockUserToken)){let m,T;if(typeof r.mockUserToken=="string")m=r.mockUserToken,T=gt.MOCK_USER;else{m=uh(r.mockUserToken,(f=n._app)==null?void 0:f.options.projectId);const R=r.mockUserToken.sub||r.mockUserToken.user_id;if(!R)throw new V(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");T=new gt(R)}n._authCredentials=new nm(new Yc(m,T))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class le{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new le(this.firestore,t,this._query)}}class it{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ee(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new it(this.firestore,t,this._key)}toJSON(){return{type:it._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(t,e,r){if(xn(e,it._jsonSchema))return new it(t,r||null,new O(W.fromString(e.referencePath)))}}it._jsonSchemaVersion="firestore/documentReference/1.0",it._jsonSchema={type:rt("string",it._jsonSchemaVersion),referencePath:rt("string")};class ee extends le{constructor(t,e,r){super(t,e,mi(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new it(this.firestore,null,new O(t))}withConverter(t){return new ee(this.firestore,t,this._path)}}function P_(n,t,...e){if(n=Ft(n),Jc("collection","path",t),n instanceof zr){const r=W.fromString(t,...e);return da(r),new ee(n,null,r)}{if(!(n instanceof it||n instanceof ee))throw new V(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(W.fromString(t,...e));return da(r),new ee(n.firestore,null,r)}}function c_(n,t,...e){if(n=Ft(n),arguments.length===1&&(t=ci.newId()),Jc("doc","path",t),n instanceof zr){const r=W.fromString(t,...e);return fa(r),new it(n,null,new O(r))}{if(!(n instanceof it||n instanceof ee))throw new V(S.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(W.fromString(t,...e));return fa(r),new it(n.firestore,n instanceof ee?n.converter:null,new O(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nc="AsyncQueue";class rc{constructor(t=Promise.resolve()){this.Yu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new zu(this,"async_queue_retry"),this._c=()=>{const r=Ss();r&&D(nc,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=t;const e=Ss();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.uc(),this.cc(t)}enterRestrictedMode(t){if(!this.ec){this.ec=!0,this.sc=t||!1;const e=Ss();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this._c)}}enqueue(t){if(this.uc(),this.ec)return new Promise((()=>{}));const e=new Te;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(t().then(e.resolve,e.reject),e.promise))).then((()=>e.promise))}enqueueRetryable(t){this.enqueueAndForget((()=>(this.Yu.push(t),this.lc())))}async lc(){if(this.Yu.length!==0){try{await this.Yu[0](),this.Yu.shift(),this.M_.reset()}catch(t){if(!Qe(t))throw t;D(nc,"Operation failed with retryable error: "+t)}this.Yu.length>0&&this.M_.p_((()=>this.lc()))}}cc(t){const e=this.ac.then((()=>(this.rc=!0,t().catch((r=>{throw this.nc=r,this.rc=!1,$t("INTERNAL UNHANDLED ERROR: ",sc(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=e,e}enqueueAfterDelay(t,e,r){this.uc(),this.oc.indexOf(t)>-1&&(e=0);const s=bi.createAndSchedule(this,t,e,r,(o=>this.hc(o)));return this.tc.push(s),s}uc(){this.nc&&x(47125,{Pc:sc(this.nc)})}verifyOperationInProgress(){}async Tc(){let t;do t=this.ac,await t;while(t!==this.ac)}Ec(t){for(const e of this.tc)if(e.timerId===t)return!0;return!1}Ic(t){return this.Tc().then((()=>{this.tc.sort(((e,r)=>e.targetTimeMs-r.targetTimeMs));for(const e of this.tc)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.Tc()}))}Rc(t){this.oc.push(t)}hc(t){const e=this.tc.indexOf(t);this.tc.splice(e,1)}}function sc(n){let t=n.message||"";return n.stack&&(t=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),t}class br extends zr{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=new rc,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new rc(t),this._firestoreClient=void 0,await t}}}function C_(n,t){const e=typeof n=="object"?n:Ec(),r=typeof n=="string"?n:yr,s=Mn(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=ah("firestore");o&&a_(s,...o)}return s}function ul(n){if(n._terminated)throw new V(S.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||u_(n),n._firestoreClient}function u_(n){var r,s,o,a;const t=n._freezeSettings(),e=o_(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,(s=n._app)==null?void 0:s.options.apiKey,t);n._componentsProvider||(o=t.localCache)!=null&&o._offlineComponentProvider&&((a=t.localCache)!=null&&a._onlineComponentProvider)&&(n._componentsProvider={_offline:t.localCache._offlineComponentProvider,_online:t.localCache._onlineComponentProvider}),n._firestoreClient=new t_(n._authCredentials,n._appCheckCredentials,n._queue,e,n._componentsProvider&&(function(h){const f=h==null?void 0:h._online.build();return{_offline:h==null?void 0:h._offline.build(f),_online:f}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new bt(ht.fromBase64String(t))}catch(e){throw new V(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new bt(ht.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}toJSON(){return{type:bt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(t){if(xn(t,bt._jsonSchema))return bt.fromBase64String(t.bytes)}}bt._jsonSchemaVersion="firestore/bytes/1.0",bt._jsonSchema={type:rt("string",bt._jsonSchemaVersion),bytes:rt("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ll{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new V(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new lt(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lt{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new V(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new V(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}_compareTo(t){return B(this._lat,t._lat)||B(this._long,t._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Lt._jsonSchemaVersion}}static fromJSON(t){if(xn(t,Lt._jsonSchema))return new Lt(t.latitude,t.longitude)}}Lt._jsonSchemaVersion="firestore/geoPoint/1.0",Lt._jsonSchema={type:rt("string",Lt._jsonSchemaVersion),latitude:rt("number"),longitude:rt("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ct{constructor(t){this._values=(t||[]).map((e=>e))}toArray(){return this._values.map((t=>t))}isEqual(t){return(function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0})(this._values,t._values)}toJSON(){return{type:Ct._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(t){if(xn(t,Ct._jsonSchema)){if(Array.isArray(t.vectorValues)&&t.vectorValues.every((e=>typeof e=="number")))return new Ct(t.vectorValues);throw new V(S.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Ct._jsonSchemaVersion="firestore/vectorValue/1.0",Ct._jsonSchema={type:rt("string",Ct._jsonSchemaVersion),vectorValues:rt("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const l_=/^__.*__$/;class h_{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new Ce(t,this.data,this.fieldMask,e,this.fieldTransforms):new Ln(t,this.data,e,this.fieldTransforms)}}function hl(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw x(40011,{dataSource:n})}}class ki{constructor(t,e,r,s,o,a){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.Ac(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}i(t){return new ki({...this.settings,...t},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}dc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.i({path:e,arrayElement:!1});return r.mc(t),r}fc(t){var s;const e=(s=this.path)==null?void 0:s.child(t),r=this.i({path:e,arrayElement:!1});return r.Ac(),r}gc(t){return this.i({path:void 0,arrayElement:!0})}yc(t){return Pr(t,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(t){return this.fieldMask.find((e=>t.isPrefixOf(e)))!==void 0||this.fieldTransforms.find((e=>t.isPrefixOf(e.field)))!==void 0}Ac(){if(this.path)for(let t=0;t<this.path.length;t++)this.mc(this.path.get(t))}mc(t){if(t.length===0)throw this.yc("Document fields must not be empty");if(hl(this.dataSource)&&l_.test(t))throw this.yc('Document fields cannot begin and end with "__"')}}class f_{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||qr(t)}A(t,e,r,s=!1){return new ki({dataSource:t,methodName:e,targetDoc:r,path:lt.emptyPath(),arrayElement:!1,hasConverter:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function fl(n){const t=n._freezeSettings(),e=qr(n._databaseId);return new f_(n._databaseId,!!t.ignoreUndefinedProperties,e)}function d_(n,t,e,r,s,o={}){const a=n.A(o.merge||o.mergeFields?2:0,t,e,s);pl("Data must be an object, but it was:",a,r);const l=dl(r,a);let h,f;if(o.merge)h=new Pt(a.fieldMask),f=a.fieldTransforms;else if(o.mergeFields){const m=[];for(const T of o.mergeFields){const R=Gr(t,T,e);if(!a.contains(R))throw new V(S.INVALID_ARGUMENT,`Field '${R}' is specified in your field mask but missing from your input data.`);__(m,R)||m.push(R)}h=new Pt(m),f=a.fieldTransforms.filter((T=>h.covers(T.field)))}else h=null,f=a.fieldTransforms;return new h_(new St(l),h,f)}class Oi extends Ni{_toFieldTransform(t){return new Jm(t.path,new Nn)}isEqual(t){return t instanceof Oi}}function m_(n,t,e,r=!1){return Mi(e,n.A(r?4:3,t))}function Mi(n,t){if(ml(n=Ft(n)))return pl("Unsupported field value:",t,n),dl(n,t);if(n instanceof Ni)return(function(r,s){if(!hl(s.dataSource))throw s.yc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.yc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)})(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.arrayElement&&t.dataSource!==4)throw t.yc("Nested arrays are not supported");return(function(r,s){const o=[];let a=0;for(const l of r){let h=Mi(l,s.gc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}})(n,t)}return(function(r,s){if((r=Ft(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Wm(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=Y.fromDate(r);return{timestampValue:vr(s.serializer,o)}}if(r instanceof Y){const o=new Y(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:vr(s.serializer,o)}}if(r instanceof Lt)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof bt)return{bytesValue:Nu(s.serializer,r._byteString)};if(r instanceof it){const o=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw s.yc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:yi(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Ct)return(function(a,l){const h=a instanceof Ct?a.toArray():a;return{mapValue:{fields:{[ou]:{stringValue:au},[Er]:{arrayValue:{values:h.map((m=>{if(typeof m!="number")throw l.yc("VectorValues must only contain numeric values.");return pi(l.serializer,m)}))}}}}}})(r,s);if(Uu(r))return r._toProto(s.serializer);throw s.yc(`Unsupported field value: ${Nr(r)}`)})(n,t)}function dl(n,t){const e={};return tu(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):be(n,((r,s)=>{const o=Mi(s,t.dc(r));o!=null&&(e[r]=o)})),{mapValue:{fields:e}}}function ml(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Y||n instanceof Lt||n instanceof bt||n instanceof it||n instanceof Ni||n instanceof Ct||Uu(n))}function pl(n,t,e){if(!ml(e)||!Xc(e)){const r=Nr(e);throw r==="an object"?t.yc(n+" a custom object"):t.yc(n+" "+r)}}function Gr(n,t,e){if((t=Ft(t))instanceof ll)return t._internalPath;if(typeof t=="string")return g_(n,t);throw Pr("Field path arguments must be of type string or ",n,!1,void 0,e)}const p_=new RegExp("[~\\*/\\[\\]]");function g_(n,t,e){if(t.search(p_)>=0)throw Pr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new ll(...t.split("."))._internalPath}catch{throw Pr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Pr(n,t,e,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let l=`Function ${t}() called with invalid data`;e&&(l+=" (via `toFirestore()`)"),l+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new V(S.INVALID_ARGUMENT,l+n+h)}function __(n,t){return n.some((e=>e.isEqual(t)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y_{convertValue(t,e="none"){switch(oe(t)){case 0:return null;case 1:return t.booleanValue;case 2:return tt(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(ie(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 11:return this.convertObject(t.mapValue,e);case 10:return this.convertVectorValue(t.mapValue);default:throw x(62114,{value:t})}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return be(t,((s,o)=>{r[s]=this.convertValue(o,e)})),r}convertVectorValue(t){var r,s,o;const e=(o=(s=(r=t.fields)==null?void 0:r[Er].arrayValue)==null?void 0:s.values)==null?void 0:o.map((a=>tt(a.doubleValue)));return new Ct(e)}convertGeoPoint(t){return new Lt(tt(t.latitude),tt(t.longitude))}convertArray(t,e){return(t.values||[]).map((r=>this.convertValue(r,e)))}convertServerTimestamp(t,e){switch(e){case"previous":const r=Mr(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(Pn(t));default:return null}}convertTimestamp(t){const e=se(t);return new Y(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=W.fromString(t);z(Fu(r),9688,{name:t});const s=new Cn(r.get(1),r.get(3)),o=new O(r.popFirst(5));return s.isEqual(e)||$t(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),o}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gl extends y_{constructor(t){super(),this.firestore=t}convertBytes(t){return new bt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new it(this.firestore,null,e)}}function V_(){return new Oi("serverTimestamp")}const ic="@firebase/firestore",oc="4.13.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ac(n){return(function(e,r){if(typeof e!="object"||e===null)return!1;const s=e;for(const o of r)if(o in s&&typeof s[o]=="function")return!0;return!1})(n,["next","error","complete"])}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _l{constructor(t,e,r,s,o){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new it(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new E_(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var t;return((t=this._document)==null?void 0:t.data.clone().value.mapValue.fields)??void 0}get(t){if(this._document){const e=this._document.data.field(Gr("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class E_ extends _l{data(){return super.data()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T_(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new V(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class xi{}class Li extends xi{}function D_(n,t,...e){let r=[];t instanceof xi&&r.push(t),r=r.concat(e),(function(o){const a=o.filter((h=>h instanceof Ui)).length,l=o.filter((h=>h instanceof Fi)).length;if(a>1||a>0&&l>0)throw new V(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class Fi extends Li{constructor(t,e,r){super(),this._field=t,this._op=e,this._value=r,this.type="where"}static _create(t,e,r){return new Fi(t,e,r)}_apply(t){const e=this._parse(t);return yl(t._query,e),new le(t.firestore,t.converter,Bs(t._query,e))}_parse(t){const e=fl(t.firestore);return(function(o,a,l,h,f,m,T){let R;if(f.isKeyField()){if(m==="array-contains"||m==="array-contains-any")throw new V(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${m}' queries on documentId().`);if(m==="in"||m==="not-in"){uc(T,m);const N=[];for(const M of T)N.push(cc(h,o,M));R={arrayValue:{values:N}}}else R=cc(h,o,T)}else m!=="in"&&m!=="not-in"&&m!=="array-contains-any"||uc(T,m),R=m_(l,a,T,m==="in"||m==="not-in");return nt.create(f,m,R)})(t._query,"where",e,t.firestore._databaseId,this._field,this._op,this._value)}}class Ui extends xi{constructor(t,e){super(),this.type=t,this._queryConstraints=e}static _create(t,e){return new Ui(t,e)}_parse(t){const e=this._queryConstraints.map((r=>r._parse(t))).filter((r=>r.getFilters().length>0));return e.length===1?e[0]:Vt.create(e,this._getOperator())}_apply(t){const e=this._parse(t);return e.getFilters().length===0?t:((function(s,o){let a=s;const l=o.getFlattenedFilters();for(const h of l)yl(a,h),a=Bs(a,h)})(t._query,e),new le(t.firestore,t.converter,Bs(t._query,e)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Bi extends Li{constructor(t,e){super(),this._field=t,this._direction=e,this.type="orderBy"}static _create(t,e){return new Bi(t,e)}_apply(t){const e=(function(s,o,a){if(s.startAt!==null)throw new V(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new V(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Dn(o,a)})(t._query,this._field,this._direction);return new le(t.firestore,t.converter,Bm(t._query,e))}}function N_(n,t="asc"){const e=t,r=Gr("orderBy",n);return Bi._create(r,e)}class qi extends Li{constructor(t,e,r){super(),this.type=t,this._limit=e,this._limitType=r}static _create(t,e,r){return new qi(t,e,r)}_apply(t){return new le(t.firestore,t.converter,Ir(t._query,this._limit,this._limitType))}}function k_(n){return qi._create("limit",n,"F")}function cc(n,t,e){if(typeof(e=Ft(e))=="string"){if(e==="")throw new V(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!pu(t)&&e.indexOf("/")!==-1)throw new V(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${e}' contains a '/' character.`);const r=t.path.child(W.fromString(e));if(!O.isDocumentKey(r))throw new V(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Ia(n,new O(r))}if(e instanceof it)return Ia(n,e._key);throw new V(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Nr(e)}.`)}function uc(n,t){if(!Array.isArray(n)||n.length===0)throw new V(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`)}function yl(n,t){const e=(function(s,o){for(const a of s)for(const l of a.getFlattenedFilters())if(o.indexOf(l.op)>=0)return l.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(t.op));if(e!==null)throw e===t.op?new V(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`):new V(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${t.op.toString()}' filters with '${e.toString()}' filters.`)}function I_(n,t,e){let r;return r=n?n.toFirestore(t):t,r}class En{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class Ie extends _l{constructor(t,e,r,s,o,a){super(t,e,r,s,a),this._firestore=t,this._firestoreImpl=t,this.metadata=o}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new fr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(Gr("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new V(S.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t=this._document,e={};return e.type=Ie._jsonSchemaVersion,e.bundle="",e.bundleSource="DocumentSnapshot",e.bundleName=this._key.toString(),!t||!t.isValidDocument()||!t.isFoundDocument()?e:(this._userDataWriter.convertObjectMap(t.data.value.mapValue.fields,"previous"),e.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),e)}}Ie._jsonSchemaVersion="firestore/documentSnapshot/1.0",Ie._jsonSchema={type:rt("string",Ie._jsonSchemaVersion),bundleSource:rt("string","DocumentSnapshot"),bundleName:rt("string"),bundle:rt("string")};class fr extends Ie{data(t={}){return super.data(t)}}class qe{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new En(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach((e=>t.push(e))),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach((r=>{t.call(e,new fr(this._firestore,this._userDataWriter,r.key,r,new En(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new V(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=(function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map((l=>{const h=new fr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new En(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);return l.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}}))}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((l=>o||l.type!==3)).map((l=>{const h=new fr(s._firestore,s._userDataWriter,l.doc.key,l.doc,new En(s._snapshot.mutatedKeys.has(l.doc.key),s._snapshot.fromCache),s.query.converter);let f=-1,m=-1;return l.type!==0&&(f=a.indexOf(l.doc.key),a=a.delete(l.doc.key)),l.type!==1&&(a=a.add(l.doc),m=a.indexOf(l.doc.key)),{type:w_(l.type),doc:h,oldIndex:f,newIndex:m}}))}})(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new V(S.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const t={};t.type=qe._jsonSchemaVersion,t.bundleSource="QuerySnapshot",t.bundleName=ci.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const e=[],r=[],s=[];return this.docs.forEach((o=>{o._document!==null&&(e.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))})),t.bundle=(this._firestore,this.query._query,t.bundleName,"NOT SUPPORTED"),t}}function w_(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return x(61501,{type:n})}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */qe._jsonSchemaVersion="firestore/querySnapshot/1.0",qe._jsonSchema={type:rt("string",qe._jsonSchemaVersion),bundleSource:rt("string","QuerySnapshot"),bundleName:rt("string"),bundle:rt("string")};function O_(n,t){const e=Tn(n.firestore,br),r=c_(n),s=I_(n.converter,t),o=fl(n.firestore);return v_(e,[d_(o,"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Bt.exists(!1))]).then((()=>r))}function M_(n,...t){var f,m,T;n=Ft(n);let e={includeMetadataChanges:!1,source:"default"},r=0;typeof t[r]!="object"||ac(t[r])||(e=t[r++]);const s={includeMetadataChanges:e.includeMetadataChanges,source:e.source};if(ac(t[r])){const R=t[r];t[r]=(f=R.next)==null?void 0:f.bind(R),t[r+1]=(m=R.error)==null?void 0:m.bind(R),t[r+2]=(T=R.complete)==null?void 0:T.bind(R)}let o,a,l;if(n instanceof it)a=Tn(n.firestore,br),l=mi(n._key.path),o={next:R=>{t[r]&&t[r](A_(a,n,R))},error:t[r+1],complete:t[r+2]};else{const R=Tn(n,le);a=Tn(R.firestore,br),l=R._query;const P=new gl(a);o={next:N=>{t[r]&&t[r](new qe(a,P,R,N))},error:t[r+1],complete:t[r+2]},T_(n._query)}const h=ul(a);return r_(h,l,s,o)}function v_(n,t){const e=ul(n);return s_(e,t)}function A_(n,t,e){const r=e.docs.get(t._key),s=new gl(n);return new Ie(n,s,t._key,r,new En(e.hasPendingWrites,e.fromCache),t.converter)}(function(t,e=!0){tm(Tf),ne(new qt("firestore",((r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),l=new br(new rm(r.getProvider("auth-internal")),new om(a,r.getProvider("app-check-internal")),vm(a,s),a);return o={useFetchStreams:e,...o},l._setSettings(o),l}),"PUBLIC").setMultipleInstances(!0)),Ot(ic,oc,t),Ot(ic,oc,"esm2020")})();export{qt as C,ch as D,Cr as E,Zs as L,ne as _,S_ as a,hc as b,If as c,C_ as d,k_ as e,P_ as f,R_ as g,M_ as h,Js as i,O_ as j,V_ as k,Yd as l,N_ as o,D_ as q,Ot as r,Qd as s};
