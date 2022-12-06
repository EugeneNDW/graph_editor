import {v4 as uuidv4} from 'uuid';

export class GraphNode {
    constructor(id, character, text, processor, illustration){
        this.id = id
        this.character = character
        this.text = text
        this.processor = processor
        this.illustration = illustration
    }
}

export class Option {
    constructor(text, optionConditionId) {
        this.uuid = uuidv4();
        this.fromNode = null
        this.toNode = null
        this.text = text
        this.optionConditionId = optionConditionId
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

    const addNodeWithOption = (nodeText, nodeCharacter, optionText, processor, illustration, optionConditionId) => {
        let toNode = new GraphNode(idCounter(), nodeCharacter, nodeText, processor, illustration)
        let option = new Option(optionText, optionConditionId)
        let node = nodes[currentNode]

        option.fromNode = node.id
        option.toNode = toNode.id

        nodes[toNode.id] = toNode
        nodesToOptions[toNode.id] = []

        nodesToOptions[node.id].push(option)
    }
    
    const addNewOption = (optionText, optionConditionId, fromNode, toNode) => {
        let option = new Option(optionText, optionConditionId)
        console.log(option)
        
        option.fromNode = fromNode.id
        option.toNode = toNode.id

        nodesToOptions[fromNode.id].push(option)
    }
    

    return {   
        buildGraph: () => {
            let startNode = new GraphNode(idCounter(), "TECHNICAL", "TECH")
            nodes[startNode.id] = startNode
            nodesToOptions[startNode.id] = []
        },

        addNode: (nodeText, nodeCharacter, optionText, processor, illustration, optionConditionId) => {
            addNodeWithOption(nodeText, nodeCharacter, optionText, processor, illustration, optionConditionId)
        },

        addOption: (optionText, optionConditionId, fromNode, toNode) => {
            addNewOption(optionText, optionConditionId, fromNode, toNode)
        },

        getCurrentNode: () => {
            return nodes[currentNode]
        },

        getCurrentNodeWithOptions: () => {
            const node = nodes[currentNode]
            const options = nodesToOptions[currentNode]
            const optionToNodes = []
            for(let o in options) {
                const opt = options[o]
                const toNodeId = opt.toNode
                const optionNode = nodes[toNodeId]
                optionToNodes.push({option: opt, optionNode: optionNode})
            }

            return {node: node, options: options, optionNodes: optionToNodes}
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