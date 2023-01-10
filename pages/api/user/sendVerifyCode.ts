import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { format } from "date-fns";
import md5 from "md5";
import { encode } from "js-base64";
import request from "service/request";
import { ISession } from "../index";
import { ironOptions } from "config/index";

const SendVerifyCode = async (req: NextApiRequest, res: NextApiResponse) => {
  const { phone } = req.body;
  const session: ISession = req.session;

  if (!phone) {
    res.status(200).json({
      code: -1,
      msg: "请输入手机号"
    });
  }

  const accountSid = "2c94811c855ce72501857d724d69026a";
  const accountToken = "ed75fd587210498e91e9e8f97b5d8656";
  const appId = "2c94811c855ce72501857d724e450271";
  const time = format(new Date(), "yyyyMMddHHmmss");
  const SigParameter = md5(`${accountSid}${accountToken}${time}`);
  const Authorization = encode(`${accountSid}:${time}`);
  const verifyCode = Math.floor(Math.random() * (9999 - 1000)) + 1000;
  const expireMinute = 5;
  const url = `https://app.cloopen.com:8883/2013-12-26/Accounts/${accountSid}/SMS/TemplateSMS?sig=${SigParameter}`;

  /**
   * {
   *     statusCode: '000000',
   *     templateSMS: {
   *       smsMessageSid: '8940fbd64dac497cb57a5838008ac002',
   *         dateCreated: '20230105094709'
   *     }
   *   }
   */
  const response = await request.post(
    url,
    {
      to: phone,
      appId,
      templateId: "1",
      datas: [verifyCode, expireMinute]
    },
    {
      headers: { Authorization }
    }
  );

  const { statusCode, statusMsg } = response as any;
  if (statusCode === "000000") {
    console.log("verifyCode:", verifyCode);
    session.verifyCode = verifyCode;
    await session.save();
    res.status(200).json({
      code: 0,
      msg: "发送成功",
      data: { verifyCode }
    });
  } else {
    res.status(200).json({
      code: statusCode,
      msg: statusMsg
    });
  }
};

export default withIronSessionApiRoute(SendVerifyCode, ironOptions);
