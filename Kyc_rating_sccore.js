const express = require("express");

const jwt_decode = require('jwt-decode');

const kyc_rating = express();

var cors = require("cors");
kyc_rating.use(cors());

kyc_rating.use(express.json());

const db = require('./config/db');

// get api
kyc_rating.get('/kyc_rating_score', (req, response) => {


    try {

        let query = "call common_skalav2.sp_kyc_score('get',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL)";

        db.query(query, (error, res) => {

            // console.log("result-->",res[0]);
            response.status(200).json({
                status: 200,
                data: res[0]
            })
        })

    } catch (error) {

        console.log("error--->", error);

    }



})

// update api

kyc_rating.put('/kyc_rating_update', (req, response) => {


    try {


        let data = req.body;

        console.log("nody data",data);

        let query = "SET @apiType = ?; SET @base_no = ?; SET @pan_no = ?; SET @gst_no = ?; SET @pf_no = ?; \
        SET @esic_no =?;SET @itr_current_year_no =?;SET @itr_secondlast_year_no =?;SET @itr_thirdlast_year_no =?;\
     SET @reference_contact_details1_no =?;SET  @reference_contact_details2_no =?;SET @work_order1_no =?;\
     SET @work_order2_no =?; SET @lin_no =?;SET @cin_no =?;SET @tax_tan_no =?;\
     SET @date_of_incorporation_no =?;SET @mobile_no_num =?;SET @email_no =?;\
     SET @msme_no =?;SET @mgmt_quota_no =?;\
     CALL  common_skalav2.sp_kyc_score('post',@base_no,@pan_no,@gst_no,@pf_no,@esic_no,@itr_current_year_no,@itr_secondlast_year_no,  \
     @itr_thirdlast_year_no,@reference_contact_details1_no,@reference_contact_details2_no,@work_order1_no, @work_order2_no,  \
     @lin_no,@cin_no,@tax_tan_no,@date_of_incorporation_no,@mobile_no_num,@email_no,@msme_no,@mgmt_quota_no)";

        db.query(query, ['post', data.basepoint, data.pan, data.gst, data.pf,data.esic, data.itr_current_year, data.itr_secondlast_year, data.itr_thirdlast_year
            , data.reference_contact_details1, data.reference_contact_details2, data.work_order1, data.work_order2
            , data.lin, data.cin, data.tax_tan, data.date_of_incorporation, data.mobile_no, data.email, data.msme,
            data.mgmt_quota], (err, res) => {

                if(err)
                {
                    console.log("error is --->",err);
                }

                console.log("resilt update", res);
                response.status(200).json({
                    status: 200,
                    data: res,

                })
            })


    } catch (error) {

        console.log("error of post", error);
    }
})



module.exports = kyc_rating;

