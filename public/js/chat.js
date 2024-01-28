const socket = io()

//escucho lo que me devuelve el server y lo renderizo
socket.on('allMsgs', (data) => {
    renderAllMsgs (data)
    let chat = document.getElementById('box')
    chat.scrollTop = chat.scrollHeight
})

const renderAllMsgs = (data) => {
    const html = data.map (msg => {
        return (
            `
        <div>
            <strong>${msg.author}</strong> dice <em>${msg.text}</em>
        </div>
        `
        )
    }).join(" ")
    document.getElementById('box').innerHTML = html
}

//agrego msjs nuevos y los envio al servidor
const addMsg = () => {
    const msg = {
        author: document.getElementById('name').value,
        text: document.getElementById('mensaje').value
    }
    socket.emit('newMsg', msg)
    return false
}

