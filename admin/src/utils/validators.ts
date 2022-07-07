export const rules = {
  horLinePattern: /^(-|—|——|—|－)$/,
  email: [{ required: false, type: 'email', message: '邮箱格式不正确', trigger: 'blur' }],
  // 护照
  passport: /(^[EeKkGgDdSsPpHh]\d{8}$)|(^(([Ee][a-fA-F])|([DdSsPp][Ee])|([Kk][Jj])|([Mm][Aa])|(1[45]))\d{7}$)/,
  passportMsg: '护照格式有误',
  // 验证自然数
  naturalNumber: /^(([0-9]*[1-9][0-9]*)|(0+))$/,
  naturalNumberMsg: '请输入自然数',
  // 英文
  english: /^.[A-Za-z]+$/,
  englishMsg: '请输入英文字符',
  tel: /^1(3|4|5|6|7|8|9)\d{9}$/,
  telMsg: '请输入正确的手机号',
  // 座机
  telephone: /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/,
  telephoneMsg: '请输入正确的座机号',
  // 银行卡号码
  bankCard: /^[1-9]\d{9,19}$/,
  bankCardMsg: '请输入正确的银行卡号码',
  // 身份证号码
  IDNumber: /^[a-z0-9A-Z]{0,50}$/,
  IDNumberMsg: '请输入正确的身份证号码',
  // 统一社会信用代码
  socialCreditCode: /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/,
  socialCreditCodeMsg: '统一社会信用代码格式有误',
  // 身份证号码,包括15位和18位的
  IDCard: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{7}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/,
  IDCardMsg: '请输入正确的身份证号码',
  virtualIDCard: /^(QT|WJ|SW)\d{8}(0[1-9]|1[0-2])(0[1-9]|[1-2]\d|3[0-1])\d{4}$/,
  // 网址, 仅支持http和https开头的
  url: /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?$/,
  urlMsg: '请输入以http和https开头的网址',
  // 0到20位的英文字符和数字
  enNum0to20: /^[a-z0-9A-Z]{0,20}$/,
  enNum0to20Msg: '请输入20位以内的英文字符和数字',
  // 2到100位的中英文字符和空格
  cnEnSpace2to100: /^[a-zA-Z\u4E00-\u9FA5\s*]{2,100}$/,
  cnEnSpace2to100Msg: '请输入2到100位的中英文字符和空格',
  // 数字和换行符
  numLinefeed: /^[0-9\n*]+$/,
  numLinefeedMsg: '请输入数字和换行符',
  // 255位以内的字符
  char0to255: /^.{0,255}$/,
  char0to255Msg: '请输入255位以内的字符',
  // 支持places位的小数
  decimalNumber(places: number) {
    const pattern = new RegExp(`(0|^-?[1-9][0-9]*)(.[0-9]{1,${places}})?$`)
    return { pattern, message: `请填写${places}位内的小数`, trigger: 'blur' }
  },
}
