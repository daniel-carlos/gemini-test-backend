export const prompts = {
    WATER: `
            A imagem contém um hidrômetro com uma medição de consumo. 
            o hidrômetro da imagem contém um visor mecânico giratório. 
            Qual o valor preciso da medição exibida no visor? 
            Retorne precisamente apenas o valor com os dígitos numéricos.
            (é essencial que a sua resposta só forneça os números encontrados, não é necessário qualquer observação, comentário ou texto adicional) 
            Considere o fato de que, por ser um visor giratório, o número mostrado em alguns espaços pode estar na transição entre dois valores adjacentes.
            Desconsidere as informações técnicas.
            Desconsidere qualquer outro elemento além dos núneros.
            importante: cuidado com o espaço entre os dígitos do display do hidrômetro que podem ser confundidos com um '1'
            lembre-se que todos os números dos displays aparecem numa cor escura sobre um background branco
        `,
    GAS: `
            A imagem contém um medidor de gás com uma medição de consumo. 
            o medidor de gás da imagem contém um visor mecânico giratório. 
            Qual o valor preciso da medição exibida no visor? 
            Retorne precisamente apenas o valor com os dígitos numéricos.
            (é essencial que a sua resposta só forneça os números encontrados, não é necessário qualquer observação, comentário ou texto adicional) 
            Considere o fato de que, por ser um visor giratório, o número mostrado em alguns espaços pode estar na transição entre dois valores adjacentes.
            Desconsidere as informações técnicas.
            Desconsidere qualquer outro elemento além dos núneros.
            importante: cuidado com o espaço entre os dígitos do display do medidor de gás que podem ser confundidos com um '1'
            lembre-se que todos os números dos displays aparecem numa cor escura sobre um background branco
        `,
}