var usermodel = require('../model/usermodel')
const bcrypt = require('bcrypt');
login_status = 0;

// -------- Add User --------
exports.insert = async (req, res) => {

    var data = await usermodel.find({ "email": req.body.email });
    if (data.length == 1) {
        res.status(200).json({
            status: "Email already exist..!"
        })
    }
    else {

        var b_pass = await bcrypt.hash(req.body.password, 10);
        req.body.password = b_pass
        var data = await usermodel.create(req.body);
        res.status(200).json({
            data
        })
    }

}

// -------- View User --------
exports.getdata = async (req, res) => {

    var data = await usermodel.find();

    res.status(200).json({
        data
    })
}

// -------- Login User --------

exports.login = async (req, res) => {

    var data = await usermodel.find({ "email": req.body.email });

    if (login_status == 0) {

        console.log("login ---", login_status);

        if (data.length == 1) {

            console.log("data ---", data.length);


            bcrypt.compare(req.body.password, data[0].password, function (err, result) {

                if (result == true) {
                    login_status = 1
                    res.status(200).json({
                        status: "login succsfull..",
                        data
                    })
                }
                else {
                    res.status(200).json({
                        status: "check your email and password..!"
                    })
                }
            });
        } else {
            res.status(200).json({
                status: "check your email and password..!"
            })
        }
    } else {
        res.status(200).json({
            status: "User is already logged in..!."
        })
    }
}

// -------- Logout User --------
exports.logout = async (req, res) => {

    login_status = 0

    res.status(200).json({
        status: 'User logged out...'
    })
}

