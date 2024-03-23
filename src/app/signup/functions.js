import { v4 as uuidv4 } from "uuid";

const setUserData = ({uid, email, company, phone, firstName, lastname, address})=> {


    const date = new Date()


    const userData = {
        user_uid: uid,
        user_email: email,
        user_company: company,
        user_phone: phone,
        user_first_name: firstName,
        user_last_name: lastname,
        user_created: date.toISOString(),
        user_updates: date.toISOString(),
        user_type: "account",
        user_website: "",
        user_monthly_jobs: 100,
        user_monthly_jobs_used: 0,
        addresses: [
          {
            type: "address",
            id: uuidv4(),
            ...address,
          },
        ],
        user_plan: "free",
    }


    return userData

}

export { setUserData };