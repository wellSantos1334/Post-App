import styles from './Avatar.module.css';

interface IAvatarProps {
    hasBorder?: boolean;
    src: string;
    alt?: string;
}

export function Avatar({hasBorder = true, src, alt}: IAvatarProps) {
    // const hasBorder = props.hasBorder != false;
    return (
        <img
            className={hasBorder ? styles.avatarWithBorder : styles.avatar}
            src={src}
        />
    );
}