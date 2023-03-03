import { format, formatDistanceToNow } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

interface IAuthor {
    name: string;
    role: string;
    avatarUrl: string;
}

interface IContent {
    type: 'paragraph' | 'link';
    content: string;
}

interface IPostProps {
    author: IAuthor;
    publishedAt: Date;
    content: IContent[];
}

export function Post({ author, publishedAt, content }: IPostProps) {
    // Formata a data para mostrar no front-end
    // const publishedDateFormatted = new Intl.DateTimeFormat('pt-BR', {
    //     day: '2-digit',
    //     month: 'long',
    //     hour: '2-digit',
    //     minute: '2-digit',
    // }).format(publishedAt);


    // Inicia um comentário na aplicação
    const [comments, setComments] = useState([
        'Post muito bacana, hein?!',
    ]);

    // Pega os novos comentários e seta em um array
    const [newCommentText, setNewCommentText] = useState('')

    // Formata a data
    const publishedDateFormatted = format(publishedAt, "dd 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR,
    });
    const publishedDateRelativaToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true,
    })

    // Controla os novos comentários
    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()

        // Utilizando os "...", faz com que ele já venha setado os valores passados no useState
        setComments([...comments, newCommentText])
        // Limpa o input após dar submit
        setNewCommentText('')
    }

    // Adiciona o valor do novo comentário ao mudar a textarea
    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }
 
    function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    function deleteComment(commentToDelete: string) {

        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete
        })

        setComments(commentsWithoutDeletedOne);
    }

    const isNewCommentEmpty = newCommentText.length === 0

    return (
        <article className={styles.post}>
            {/* Cabeçalho da postagem */}
            <header>
                <div className={styles.author}>
                    <Avatar src={author.avatarUrl} />

                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>

                <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativaToNow}
                </time>
            </header>

            {/* Conteúdo da postagem */}
            <div className={styles.content}>
                {content.map(item => {
                    if (item.type === 'paragraph') {
                        return <p key={item.content}> {item.content} </p>;
                    } else if (item.type === 'link') {
                        return <p key={item.content}> <a href=''>{item.content}</a> </p>
                    }
                })}
            </div>
            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>

                <textarea
                    name="comment"
                    placeholder='Deixe um comentário'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentInvalid}
                    required
                />
                <footer>
                    <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map(comment => {
                    return (<Comment
                        key={comment}
                        content={comment}
                        onDeleteComment={deleteComment}
                    />)
                })}
            </div>
        </article>


    )
}