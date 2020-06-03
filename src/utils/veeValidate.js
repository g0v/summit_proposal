import { extend, localize } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";
import en from "vee-validate/dist/locale/en.json";
import fr from "vee-validate/dist/locale/fr.json";
// import zh from "vee-validate/dist/locale/zh_TW.json";

const qq = {
  code: "qq",
  messages: {
    ...en.messages
  }
};

for (const key in fr.messages) {
  if (qq.messages[key]) {
    qq.messages[key] += ` ${fr.messages[key]}`;
  } else {
    qq.messages[key] = fr.messages[key];
  }
}

extend("email", email);

extend("required", {
  ...required,
  message: "This field is required"
});

localize("fr", fr);
