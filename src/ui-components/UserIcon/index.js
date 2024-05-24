import Image from "next/image";
import styles from "./UserIcon.module.css";


const UserIcon = ({
    onClick = () => {}
}) => {
    return (
        <div onClick={onClick} className={styles.container}>
            <Image 
                src={`/user-pic.jpg`}
                width={'40'}
                height={'40'}
                alt={'user icon'}
            />
        </div>
    );
}

export default UserIcon;