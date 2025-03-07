const pool = require("../../config/db");

const getUserInfoSQL = `
    SELECT 
        hris_user_accounts.user_id, 
        hris_user_accounts.user_email, 
        hris_user_infos.first_name, 
        hris_user_infos.middle_name, 
        hris_user_infos.last_name, 
        hris_user_infos.user_pic, 
        JSON_OBJECTAGG(service_features.service_feature_id, service_features.feature_name) AS feature_names
    FROM hris_user_accounts
    LEFT JOIN hris_user_infos ON hris_user_accounts.user_id = hris_user_infos.user_id
    LEFT JOIN hris_user_access_permissions ON hris_user_accounts.user_id = hris_user_access_permissions.user_id
    LEFT JOIN service_features ON hris_user_access_permissions.service_feature_id = service_features.service_feature_id
    WHERE hris_user_accounts.user_id = ?
    GROUP BY 
        hris_user_accounts.user_id, 
        hris_user_infos.first_name, 
        hris_user_infos.middle_name, 
        hris_user_infos.last_name, 
        hris_user_infos.user_pic
`;

exports.getUserInfo = async (req, res) => {
    console.log(req.user);

    const user_id = req.user.user_id; // Assuming user_id is available in req.user after authentication

    try {
        const values = [user_id];

        const [results] = await pool.execute(getUserInfoSQL, values);
        if (results.length == 0) return res.status(404).json({ message: "User not found" });

        res.status(200).json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};