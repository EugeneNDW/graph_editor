export class GraphNode {
    constructor(id, character, text, processorId, illustration){
        this.id = id
        this.character = character
        this.text = text
        // this.processorId = processorId
        // this.illustration = illustration
    }
}

export class Option {
    constructor(text, uuid, optionConditionId) {
        // this.uuid = uuid
        this.fromNode = null
        this.toNode = null
        this.text = text
        // this.optionConditionId = optionConditionId
    }
}

const objectMap = (obj, fn) =>
  Object.fromEntries(
    Object.entries(obj).map(
      ([k, v], i) => [k, fn(v, k, i)]
    )
  )

export let graph = (function() {
    let idStart = 0
    const nodes = {}
    const nodesToOptions = {}
    let currentNode = 0

    const idCounter = () => {
        return idStart++
    }

    const addNodeWithOption = (nodeText, nodeCharacter, optionText) => {
        let toNode = new GraphNode(idCounter(), nodeCharacter, nodeText)
        let option = new Option(optionText)
        let node = nodes[currentNode]

        option.fromNode = node.id
        option.toNode = toNode.id

        nodes[toNode.id] = toNode
        nodesToOptions[toNode.id] = []

        nodesToOptions[node.id].push(option)
    }

    return {   
        buildGraph: () => {
            let startNode = new GraphNode(idCounter(), "TECHNICAL", "TECH")
            nodes[startNode.id] = startNode
            nodesToOptions[startNode.id] = []
        },

        addNode: (nodeText, nodeCharacter, optionText) => {
            addNodeWithOption(nodeText, nodeCharacter, optionText)
        },

        getCurrentNode: () => {
            return nodes[currentNode]
        },

        getCurrentNodeWithOptions: () => {
            const node = nodes[currentNode]
            const options = nodesToOptions[currentNode]
            const optionNodes = []
            
            for (let o in options) {
                const oNode = nodesToOptions[o.toNode]
                optionNodes.push(oNode)
            }

            return {node: node, options: options, optionNodes: optionNodes}
        },
    
        setCurrentNode: (id) => {
            currentNode = id
        },

        getNodeById: (id) => {
            return nodes[id]
        },

        getOptionsByNodeId: (id) => {
            return nodesToOptions[id]
        },
    
        getNodesList: () => {
            const result = []
            
            for (let key in nodes) {
                result.push(nodes[key])
            }

            return result
        },

        logGraph: () => {
            console.log(nodes)
            console.log(nodesToOptions)
        }
    }
}());

graph.buildGraph()