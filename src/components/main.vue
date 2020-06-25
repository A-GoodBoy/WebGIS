<template>
<div id ="background">
  <div class="main">
    <span>{{msg}}</span>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      msg: '2019年12月以来，湖北省武汉市持续开展流感及相关疾病监测，发现多起病毒性肺炎病例，均诊断为病毒性肺炎/肺部感染。2020年1月20日，习近平对新型冠状病毒感染的肺炎疫情作出重要指示，强调要把人民群众生命安全和身体健康放在第一位，坚决遏制疫情蔓延势头 。1月27日，受习近平总书记委托，中共中央政治局常委、国务院总理、中央应对新型冠状病毒感染肺炎疫情工作领导小组组长李克强来到武汉，考察指导疫情防控工作，看望慰问患者和奋战在一线的医护人员。当地时间2020年1月30日晚，世界卫生组织（WHO）宣布，将新型冠状病毒疫情列为国际关注的突发公共卫生事件（PHEIC）。 世界卫生组织3月11日表示，新冠肺炎疫情的爆发已经构成一次全球性“大流行”。2020年6月7日，国务院新闻办公室发布《抗击新冠肺炎疫情的中国行动》白皮书。截至6月17日24时，据31个省（自治区、直辖市）和新疆生产建设兵团报告，现有确诊病例265例（其中重症病例9例），累计治愈出院病例78394例，累计死亡病例4634例，累计报告确诊病例83293例，现有疑似病例7例。新增无症状感染者8例（境外输入2例）。累计收到港澳台地区通报确诊病例1610例。其中，香港特别行政区1120例（出院1071例，死亡4例），澳门特别行政区45例（出院45例），台湾地区445例（出院434例，死亡7例）。'
    }
  }
}
</script>

<style>
  .main {
    font-size: 20px;
    font-weight: bold;
    font-style: normal;
    margin-top: 0px;
    color: #bdf9fd;
    padding-top: 120px;
    padding-left:20px;
    padding-right: 20px;
    background-color: rgba(255, 255, 255, 0.1);
  }
  #background{
  background: url('../assets/background.jpg');
  width: 100%;
  height: 100%;
  position: inherit;
  background-size: 100% 100%;
}
</style>
