<template>
  <div class="home">
    <div class="heads">
      <Navmenu></Navmenu>
    </div>
    <router-view></router-view>
    <BottomBar></BottomBar>
  </div>
  
</template>

<script>
// @ is an alias to /src
import BottomBar from '@/components/BottomBar.vue'
import Navmenu from '@/components/nav/Navmenu.vue'
import Foot from '@/components/foot/Fooybody.vue'
export default {
  name: 'Home',
  data(){
    return {
      rotationimages: [1,2,3,4]
    }
  },
  components: {
    BottomBar,
    Navmenu
  },
  
}
</script>

<style scoped>
.rotation_chart{
  height: 18.75rem;
  border: 1px solid #EF3C2D;
}

</style>
