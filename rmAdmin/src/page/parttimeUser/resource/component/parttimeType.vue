<template>
  <div ref="form" style="display: inline-block">
    <el-select v-model="form.type"
               clearable
               @change="selectType"
               placeholder="兼职类型" class="width90">
      <el-option
        v-for="item in formSelect.typeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <template v-if="form.type === '笔译'">
      <div class="el-button-2">
        <el-select v-model="form.biyi.firstField" @change="getSecondFieldFn" placeholder="测试领域">
          <el-option
            v-for="item in $store.state.fieldOptions"
            :key="item.id"
            :label="item.fullSpecialtyName"
            :value="item.specialtyId+','+item.fullSpecialtyName">
          </el-option>
        </el-select> -
        <el-select v-model="form.biyi.secondField" multiple :collapse-tags="true" placeholder="二级领域">
          <el-option
            v-for="item in formSelect.secondFieldOptions"
            :key="item.id"
            :label="item.fullSpecialtyName"
            :value="item.fullSpecialtyName"></el-option>
        </el-select>
      </div>
      <div class="el-button-2">
        <el-select v-model="form.biyi.origin" placeholder="源语言" class="width90">
          <el-option
            v-for="item in languageList"
            :key="item.id"
            :label="item.chineseName"
            :value="item.chineseName">
          </el-option>
        </el-select> -
        <el-select v-model="form.biyi.target" placeholder="目标语言" class="width90">
          <el-option
            v-for="item in languageList"
            :key="item.id"
            :label="item.chineseName"
            :value="item.chineseName">
          </el-option>
        </el-select>
      </div>
      <el-select v-model="form.biyi.level" placeholder="等级" class="width80">
        <el-option
          v-for="item in memberLevel"
          :key="item"
          :value="item">
        </el-option>
      </el-select>
    </template>
    <template v-else-if="form.type === 'DTP'">
      <el-select v-model="form.dtp.dtpExp" multiple :collapse-tags="true" placeholder="DTP经验">
        <el-option
          v-for="item in formSelect.expeOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-select v-model="form.dtp.software" multiple :collapse-tags="true" placeholder="擅长软件">
        <el-option
          v-for="item in formSelect.softwareOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
    </template>
    <template v-else-if="form.type === '会展'">
      <div class="el-button-2">
        <el-select v-model="form.huizhan.firstField" @change="getSecondFieldFn" placeholder="擅长领域">
          <el-option
            v-for="item in $store.state.fieldOptions"
            :key="item.id"
            :label="item.fullSpecialtyName"
            :value="item.specialtyId+','+item.fullSpecialtyName">
          </el-option>
        </el-select> -
        <el-select v-model="form.huizhan.secondField" multiple :collapse-tags="true" placeholder="二级领域">
          <el-option
            v-for="item in formSelect.secondFieldOptions"
            :key="item.id"
            :label="item.fullSpecialtyName"
            :value="item.fullSpecialtyName">
          </el-option>
        </el-select>
      </div>
      <el-select v-model="form.huizhan.lanPair" multiple :collapse-tags="true" placeholder="语种">
        <el-option
          v-for="item in languageList"
          :key="item.id"
          :label="item.chineseName"
          :value="item.chineseName">
        </el-option>
      </el-select>
      <el-select v-model="form.huizhan.kyType" multiple :collapse-tags="true" placeholder="口译类型">
        <el-option
          v-for="item in formSelect.kyTypeOptions"
          :key="item"
          :value="item">
        </el-option>
      </el-select>
    </template>
    <template v-else-if="form.type === '外派' || form.type === '培训'">
      <el-select v-model="form.waiAndpei.lanPair" multiple :collapse-tags="true" placeholder="语种">
        <el-option
          v-for="item in languageList"
          :key="item.id"
          :label="item.chineseName"
          :value="item.chineseName">
        </el-option>
      </el-select>
      <div class="el-button-2">
        <el-select v-model="form.waiAndpei.firstField" @change="getSecondFieldFn" placeholder="擅长领域">
          <el-option
            v-for="item in $store.state.fieldOptions"
            :key="item.id"
            :label="item.fullSpecialtyName"
            :value="item.specialtyId+','+item.fullSpecialtyName">
          </el-option>
        </el-select> -
        <el-select v-model="form.waiAndpei.secondField" multiple :collapse-tags="true" placeholder="二级领域">
          <el-option
            v-for="item in formSelect.secondFieldOptions"
            :key="item.id"
            :label="item.fullSpecialtyName"
            :value="item.fullSpecialtyName">
          </el-option>
        </el-select>
      </div>
    </template>
  </div>
</template>
<script>
  import { mapState } from 'vuex';
  export default {
    name: 'parttimeType',
    data (){
      return {
        form: {
          type: '',
          biyi: {
            origin: '',
            target: '',
            firstField: '',
            secondField: '',
            level: ''
          },
          huizhan: {
            kyType: '',
            lanPair: '',
            firstField: '',
            secondField: ''
          },
          waiAndpei: {
            firstField: '',
            secondField: '',
            lanPair: ''
          },
          dtp: {
            dtpExp: '',
            software: ''
          }
        },
        formSelect: {
          typeOptions: [
            {label:'笔译',value:'笔译'},
            {label:'DTP',value:'DTP'},
            {label:'会展',value:'会展'},
            {label:'外派',value:'外派'},
            {label:'培训',value:'培训'}],
          kyTypeOptions: ['同声传译','陪同传译','大型活动','交替传译'],
          expeOptions: ['1年以内','1~2年','2~3年','3年以上'],
          softwareOptions: ['Word','Excel','PowerPoint','Photoshop','FrameMaker','AutoCAD','PageMaker','Illustrator','QuarkXpress','Pm'],
          secondFieldOptions: []
        }
      }
    },
    computed: {
      ...mapState([
        'languageList'
      ]),
      ...mapState('select', {
        memberLevel: state => state.memberLevel
      }),
      emptyType (){
        if(!this.form.type){
          this.clearObject(this.form)
        }
      }
    },
    methods: {
      //清空对象
      clearObject (target){
        let myType = Object.prototype.toString;
        if(myType.call(target) === '[object Object]'){
          for(let prop in target){
            if(myType.call(target[prop]) === '[object Object]'){
              this.clearObject(target[prop]);
            }else if(prop !== 'type'){
              target[prop] = '';
            }
          }
        }else {
          target = '';
        }
      },
      //切换兼职类型，清空数据
      selectType (){
        this.clearObject(this.form);
      },
      //获取二级领域
      getSecondFieldFn (val){
        this.form.biyi.secondField = '';
        this.form.huizhan.secondField = '';
        this.form.waiAndpei.secondField = '';
        const id = val.split(',')[0];
        this.getSecondField(id).then(res => {
          this.formSelect.secondFieldOptions = res
        })
      }
    }
  }
</script>
