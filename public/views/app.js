fetch('/dashboard/info')
.then(res => res.json())
.then(info => {
    const {execPath, mode, nodeVersion, os, port, processId, rss} = info

    const root = document.querySelector('#root')
    root.innerHTML = `
    <ul>
        <li>Node path: ${execPath}</li>
        <li>Node version: ${nodeVersion}</li>
        <li>OS: ${os}</li>
        <li>PID: ${processId}</li>
        <li>RSS: ${rss}</li>
        <li>Server mode: ${mode}</li>
        <li>Server port: ${port}</li>
    </ul>
    `

})