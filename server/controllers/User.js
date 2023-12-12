import { USER } from "../model/USER.js";

export const registerUser = async (req, res) => {
  try {
    const { username, password } = await req.body;
    const alreadyHaveUsername = await USER.findOne({ username });
    console.log(alreadyHaveUsername);

    if (alreadyHaveUsername) {
      return res.json({
        status: "error",
        msg: "Bu Kullanıcı Adı Var",
      });
    } else {
      const userRegister = await USER.create({ username, password });
      return res.json({
        status: "success",
        msg: "Kayit Başarılı",
        user: userRegister,
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      msg: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = await req.body;
    const user = await USER.findOne({ username });

    if (user) {
      if (user.password === password) {
        return res.json({
          status: "success",
          msg: "Giriş Başarılı",
          user: user,
        });
      } else {
        return res.json({
          status: "error",
          msg: "Şifre Yanlış",
        });
      }
    } else {
      return res.json({
        status: "error",
        msg: "Böyle Bir kullanıcı bulunamadı",
      });
    }
  } catch (error) {
    return res.json({
      status: "error",
      msg: error.message,
    });
  }
};
