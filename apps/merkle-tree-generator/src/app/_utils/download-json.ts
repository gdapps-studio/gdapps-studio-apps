export const downloadJson = (text: string) => {
    const element = document.createElement('a')
    const file = new Blob([text], {
        type: 'application/json',
    })
    element.href = URL.createObjectURL(file)
    element.download = 'tree.json'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
}
