const main_template = `
<div class="main">
  <div id="loading" v-if="loading"><span>{{loading}}</span></div>
    <div v-if="!view.entry">
      <p>ACCOUNT:</p>
      <p class="indent">{{keys.pkh}}</p>
      <p>SECRET KEY:</p>
      <p class="indent" @click="show_sk = !show_sk">
        {{show_sk ? keys.sk : '*****'}}
      </p>
      <p>BALANCE:</p>
      <p class="indent">{{balance || 'UNKNOWN'}}</p>
      <p>ACCESS CODE:</p>
      <p class="indent" ref="accessCodeNode">{{access_code || 'NONE'}}</p>
      <p>OPTIONS:</p>
      <P class="indent">
        <label><input type="checkbox" v-model="mute" /> <span>Mute for non-spending operations</span></label>
        <br>
        <label><input type="checkbox" v-model="plugin_timeout" /> <span>Limit session lifetime of plugin to 30 minutes</span></label>
        <br>
        <span>HOST: </span>
        <select v-model="host">
          <option value="https://teznode.catsigma.com">alphanet</option>
          <option value="https://zeronet.catsigma.com">zeronet</option>
        </select>
      </P>
      <p>OPERATIONS:</p>
      <p class="indent">
        <button @click="refresh_balance">REFRESH BALANCE</button> <br>
        <button @click="tez_faucet">+ BALANCE (ONLY IN ALPHANET)</button> <br>
        <button @click="clear">CLEAR</button> <br>
        <button @click="gen_access_code">GET ACCESS CODE</button> <br>
      </p>
    </div>
    <div v-if="view.entry === 'with-key'">
      <div class="group">
        <input type="password" placeholder="type local secure password" v-model="localpwd" />
        <button @click="view_stored">VIEW STORED ACCOUNT</button>
      </div>
      <div class="group">
        <button @click="clear">CLEAR</button>
      </div>
    </div>
    <div v-if="view.entry === 'without-key'">
      <label>
        <input type="radio" name="subentry" @click="view.subentry = 'import'" />
        <span>IMPORT</span>
      </label>
      <label>
        <input type="radio" name="subentry" @click="generate" />
        <span>GENERATE</span>
      </label>

      <div v-if="view.subentry.length === 0" class="group compatibility">
        <p>
          Support browsers:<br>
          <ul>
            <li>Chrome 49+</li>
            <li>Firefox 52+</li>
            <li>Safari 11+ (Safari > Preferences > Privacy > Cookies and website data > Always allow)</li>
            <li>Edge 15+</li>
            <li>Opera 48+</li>
            <li>iOS Safari 11+ (Settings > Safari > Prevent Cross-Site Tracking > Off)</li>
            <li>Android Browser 56+</li>
            <li>Android Chrome 61+</li>
          </ul>
        </p>
      </div>

      <div v-if="view.subentry === 'import'" class="group">
        <input type="password" placeholder="set local secure password" v-model="localpwd" /> <br>
        <br>

        <p>USING MNEMONIC</p>
        <p class="indent">
          <input placeholder="put mnemonic word here" v-model="import_mnemonic" /> <br>
          <input type="password" placeholder="type passphrase here" v-model="import_passphrase" />
        </p>
        <br>

        <p>USING SECRET KEY</p>
        <p class="indent">
          <input placeholder="put secret key here" v-model="import_sk" />
        </p>
        <br>

        <button @click="import_key">IMPORT</button>
      </div>
      <div v-if="view.subentry === 'generate'" class="group">
        <div v-if="!keys.sk">
          <p>{{mnemonic}}</p>
          <input type="password" placeholder="set passphrase here" v-model="passphrase" />
          <br>
          <button @click="generate_next">NEXT</button>
        </div>
        <div v-if="keys.sk">
          <p>SECRET KEY:</p>
          <p class="indent">{{keys.sk}}</p>
          <input type="password" placeholder="type local secure password" v-model="localpwd" />
          <br>
          <button @click="use_this_account" v-if="keys.sk">USE THIS ACCOUNT</button>
        </div>
      </div>
    </div>
</div>
`

module.exports = main_template