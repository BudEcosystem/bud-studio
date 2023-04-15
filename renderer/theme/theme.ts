
export const darkTheme = {
    colors:{
        primaryColor: '#181818',
        pageBackground: '#00000',
        containerBackground: '#181818'
    },
    fonts: {}
}

export const getThemeVariables(theme: any) => {
    return {
        '--bud-primary-color': theme.colors.primaryColor,
        '--bud-page-background': theme.colors.pageBackground,
        '--bud-container-background': theme.colors.containerBackground,
    }
}