import router from "@/router";
import request from "@/utils/request";

const state = {
  step: {
    // 付款账号
    payAccount: "",
    receiverAccount: {
      type: "alipay",
      number: ""
    }
  }
};

const actions = {
  async submitStepForm({ commit }, { payload }) {
    await request({
      url: "/api/form",
      method: "post",
      data: payload
    });
    // 保存更新值
    commit("saveStepFormData", payload);
    router.push("/form/step-form/result");
  }
};

const mutations = {
  saveStepFormData(state, { payload }) {
    state.step = {
      ...state.step,
      ...payload
    };
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
