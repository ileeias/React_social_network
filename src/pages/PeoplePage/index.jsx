import { useEffect, useState } from "react"
import styles from "./PeoplePage.module.css"
import { axiosInstance } from "../../services/axios";

export default function PeoplePage() {
    const [peoples, setPeoples] = useState(null);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function SearchPeople() {
            try {
                const token = localStorage.getItem('token');
            const response = await axiosInstance.get(`/ppl_search?search=${''}`,{
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Token ${token}`,
                },
            });
            setPeoples(response.data)
            } catch (error) {
                console.log(error);
                setError(error);
            }
        }
    SearchPeople();
    }, []);
    return (
        <div className={styles.post_list}>
            {peoples ? (peoples.map((people) => (
            <div className={styles.post}>
              <div className={styles.card_username}>
                {people.photo ? <img src={`http://127.0.0.1:8000${people.photo}`} alt="" /> : <img src="/icons/ava.svg" alt="ava" />}
                <p>{people.name} {people.surname}</p>
                <p>{people.birthday}</p>
              </div>
            </div>))) : "LOADING..."}
          </div>
    )
}

 {/* return(
     <div className={styles.comtainer}>
         {peoples ? (<pre>{JSON.stringify(peoples, null, 2)}</pre>) : <pre>{JSON.stringify(error, null, 2)}</pre>}
     </div>
 ) */}

//  {
//     "id": 1,
//     "name": "Илияс",
//     "surname": "Омаров",
//     "bio": "Занимаюсь в спортивном плане, активным образом жизни с 16 лет.",
//     "birthday": "1999-02-17",
//     "residence": "Astana",
//     "hobbies": "Программирование",
//     "photo": "/media/users/IMG_20230902_152635.jpg",
//     "date_joined": "2024-11-13T11:25:10.205940+05:00",
//     "friends": [
//       1,
//       9
//     ]
//   },