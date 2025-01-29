import { axiosInstance } from "../../services/axios";
import styles from "./Cabinet.module.css"
import { useForm } from "react-hook-form"
import { useEffect } from "react";


export default function Profile({
    phone_number,
    name,
    surname,
    bio,
    birthday,
    residence,
    hobbies,
    photo,
    date_joined,
    friends
}) {

    const { register, handleSubmit, setValue } = useForm();

    useEffect(() => {
        setValue('phone_number', phone_number);
        setValue('name', name);
        setValue('surname', surname);
        setValue('bio', bio);
        setValue('birthday', birthday);
        setValue('residence', residence);
        setValue('hobbies', hobbies);
    }, [phone_number, name, surname, bio, birthday, residence, hobbies, setValue]);

    const onError = (errors, e) => console.log("ERRORS", errors, e);
    const onSubmit = async(data) => {
        try {
            const token = localStorage.getItem("token");
            console.log(data);
            const response = await axiosInstance.patch("/cabinet", data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": `Token ${token}`,
                }
            });
            
        } catch (error) {
            console.log("Error", error);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit, onError)}>
            <label htmlFor="phone_number">Номер телефона</label>
            <input type="number" {...register("phone_number", { required: true })} placeholder="Номер телефона"/>
            <label htmlFor="name">Имя</label>
            <input type="text" {...register("name", { required: true })} placeholder={name}/>
            <label htmlFor="surname">Фамилия</label>
            <input type="text" {...register("surname", { required: true })} placeholder="Фамилия"/>
            <label htmlFor="bio">О себе</label>
            <input type="text" {...register("bio", { required: true })} placeholder="себе"/>
            <label htmlFor="birthday">День рождения</label>
            <input type="date" {...register("birthday", { required: true })} placeholder="рождения"/>
            <label htmlFor="residence">Город</label>
            <input type="text" {...register("residence", { required: true })} placeholder="Город"/>
            <label htmlFor="hobbies">Увлечения</label>
            <input type="text" {...register("hobbies", { required: true })} placeholder="Увлечения"/>
            <button type="submit">SUBMIT</button>
        </form>
    )
}