<template>
  <div class="page">
    <header>
      <Topbar/>
    </header>
    <main>
      <ResumeEditor/>
      <ResumePreview/>
    </main>
  </div>
</template>

<script>

import 'normalize.css/normalize.css'
import  'assets/reset.css'

import Topbar from './components/Topbar.vue'
import ResumePreview from './components/ResumePreview.vue'
import ResumeEditor from './components/ResumeEditor.vue'


export default {
  name: 'app',
  components: {Topbar, ResumeEditor, ResumePreview}
}
</script>

<style>
  .page{
    height: 100vh;
    min-width:1024px;
    display: flex;
    flex-direction: column;
    background-color: #EAEBEC;
  }
  .page>main{
    flex-grow: 1;
  }

  .page>main{
    min-width: 1024px;
    max-width: 1440px;
    margin-top: 16px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    width: 100%;
    align-self: center;
  }

  #resumeEditor{
    width: 35%;
    background-color: #444;
  }
  #resumePreview{
    flex-grow: 1;
    margin-left: 16px;
    background-color: #777;
  }
</style>
