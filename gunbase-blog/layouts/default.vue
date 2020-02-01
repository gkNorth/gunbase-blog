<template>
  <div>

    <header id="header" class="header">
      <div class="header-in">
        <h1 class="header-title">Gunbase</span></h1>
        <div class="menu-btn">
          <a href="#">MENU</a>
        </div>
      </div>
    </header>

    <span class="header-space"></span>

    <nuxt />

  </div>
</template>

<style lang="scss">
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.header {
  background: #004D40;
  box-shadow: 0 4px 10px rgba(0,0,0,.5);
  color: #eee;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  .header-in {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
  }
}
.header-space {
  display: block;
  height: 50px;
}

/* *,

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
} */
</style>
