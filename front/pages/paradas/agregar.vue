<template>
    <div :style="{'background-image': `url(${require('@/static/back4.png')})`}">
      <div class ="row">
          <div class="col-sm-1">
              <Sidebar/>
          </div>
          <div class="col-11">
            <Header/>
            <br>
            <Agregar :idStop="idStop"/>
          </div>
      </div>
      <div class="footer" :style="{'background-image': `url(${require('@/static/back4.png')})`}"></div>
    </div>
  </template>


<script>
  import Sidebar from '@/components/Sidebar'
  import Header from '@/components/Header'
  import Agregar from '@/components/Paradas/Agregar'
  export default {
    data: function(){
      return {
        idStop: this.$route.params.idStop
      }
    },
    components: {
      Sidebar,
      Header,
      Agregar
    },
    created: function(){
      console.log("id of stop");
      console.log(this.idStop); 
    }
  }
</script>

<style>
  ::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}
</style>