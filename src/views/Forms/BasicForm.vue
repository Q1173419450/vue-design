<template>
  <div>
    <a-form :layout="formLayout" :form="form">
      <a-form-item
        label="Form Layout"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-radio-group
          default-value="horizontal"
          @change="handleFormLayoutChange"
        >
          <a-radio-button value="horizontal">
            Horizontal
          </a-radio-button>
          <a-radio-button value="vertical">
            Vertical
          </a-radio-button>
          <a-radio-button value="inline">
            Inline
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="Field A"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        :hasFeedback="FieldFeed"
      >
        <!-- v-decorator：是一个标志位 ，进行劫持校验-->
        <a-input
          placeholder="请输入。。。"
          v-decorator="[
            'fieldA',
            {
              // 只初始一次，后续都需要setFieldsValue，进行改变
              initialValue: fieldA,
              rules: [
                {
                  required: true,
                  min: 6,
                  message: '必须大于5个字符'
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="Field B"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input placeholder="input placeholder" v-decorator="['fieldB']" />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" @click="handleSubmit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
/**
 * form 自动校验
 * createForm 初始表单
 * v-decorator 校验表单
 * validateFields 提交表单
 * setFieldsValue 更新表单数据
 */
export default {
  data() {
    // 新建 form 实例，挂载到Vue上
    this.form = this.$form.createForm(this);
    return {
      formLayout: "horizontal",
      fieldA: "hello",
      FieldFeed: true,
      fieldB: ""
    };
  },
  mounted() {
    setTimeout(() => {
      this.form.setFieldsValue({ fieldA: "hello world" });
    }, 3000);
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === "horizontal"
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : {};
    }
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    // 提交
    handleSubmit() {
      // 提交表单数据
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values);
          // 同步表单数据
          Object.assign(this, values);
        }
      });
    }
  }
};
</script>
