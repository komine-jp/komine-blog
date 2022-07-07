<template>
  <a-modal
    width="600px"
    :title="data.id ? '编辑用户' : '添加用户'"
    :visible="visible"
    @cancel="handleClose"
    @ok="handleOk"
  >
    <a-form v-bind="formLayout">
      <a-form-item label="用户名" v-bind="validateInfos.username">
        <a-input
          v-model:value="formRef.username"
          placeholder="请填写区域名称"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="电话号码" v-bind="validateInfos.phone">
        <a-input
          v-model:value="formRef.phone"
          placeholder="请填写电话号码"
          allow-clear
        ></a-input>
      </a-form-item>
      <a-form-item label="角色" v-bind="validateInfos.role">
        <a-select
          v-model:value="formRef.role"
          placeholder="请选择角色"
          allow-clear
        >
          <a-select-option
            v-for="(label, value) in ROLE_TYPE"
            :key="value"
            :value="value"
            >{{ label }}
          </a-select-option>
        </a-select>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { reactive, toRaw, watch } from "vue";
import { Form } from "ant-design-vue";
import { rules } from "@/utils/validators";
import { UserInfo } from "@/types/index";
import { ROLE_TYPE } from "@/constants";
const { useForm } = Form;

const formRef = reactive<UserInfo>({
  username: "",
  phone: "",
  role: undefined,
});

const commonRequired = { required: true, message: "此字段为必填字段" };
const { validateInfos, validate, resetFields } = useForm(
  formRef,
  reactive({
    username: [commonRequired],
    phone: [
      commonRequired,
      { pattern: rules.tel, message: rules.telMsg, trigger: "change" },
    ],
    role: [commonRequired],
  })
);

const formLayout = {
  size: "large",
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 18,
  },
};

const props = defineProps({
  visible: {
    default: false,
    type: Boolean,
  },
  data: {
    type: Object,
    default: () => ({}),
  },
});

const emits = defineEmits<{
  (e: "update:visible", payload: boolean): void;
  (e: "submit-confirm", payload: any): void;
}>();

function handleClose() {
  resetFields();
  emits("update:visible", false);
}

function handleOk() {
  validate().then(() => {
    const data = JSON.parse(JSON.stringify(toRaw(formRef)));
    !props.data.id && (data.id = undefined); // 清除脏数据
    emits("submit-confirm", Object.assign(data));
    handleClose();
  });
}

function handleOpen() {
  const { data } = props;
  if (data.id) {
    // 编辑的情况，先进行数据格式化
    const dataCp = JSON.parse(JSON.stringify(data));
    Object.assign(formRef, dataCp);
  }
}

watch(
  () => props.visible,
  (val: boolean) => {
    val && handleOpen();
  }
);
</script>

<style scoped></style>
