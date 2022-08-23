export function disneyMouseOver(event: Event){
    console.log(((event.target as HTMLElement).firstChild as HTMLElement).getAttribute('alt'))
}

export function disneyMouseOut(event: Event){
    console.log((event.target as HTMLElement).firstChild)
}