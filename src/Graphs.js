import {v4 as uuidv4} from 'uuid';

export class GraphNode {
    constructor(id, character, text, processor, illustration){
        this.id = id
        this.character = character
        this.text = text
        this.processorId = processor
        this.illustration = illustration
    }
}

export class Option {
    constructor(optionText, optionConditionId) {
        this.uuid = uuidv4();
        this.fromId = null
        this.toId = null
        this.optionText = optionText
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
    let currentNode = 0

    const nodes = {}
    const nodesToOptions = {}

    const idCounter = () => {
        return idStart++
    }

    const addNodeWithOption = (nodeText, nodeCharacter, optionText, processor, illustration, optionConditionId) => {
        let toNode = new GraphNode(idCounter(), nodeCharacter, nodeText, processor, illustration)
        let option = new Option(optionText, optionConditionId)
        let node = nodes[currentNode]

        option.fromId = node.id
        option.toId = toNode.id

        nodes[toNode.id] = toNode
        nodesToOptions[toNode.id] = []

        nodesToOptions[node.id].push(option)
    }
    
    const addNewOption = (optionText, optionConditionId, fromNode, toNode) => {
        let option = new Option(optionText, optionConditionId)
        console.log(option)
        
        option.fromId = fromNode.id
        option.toId = toNode.id

        nodesToOptions[fromNode.id].push(option)
    }

    const getAllOptions = () => {
        const result = [];

        for (let key in nodes) {
            const options = nodesToOptions[nodes[key].id];
            result.push(...options);
        }

        return result
    }

    const getAllNodes = () => {
        const result = []
            
        for (let key in nodes) {
            result.push(nodes[key])
        }

        return result
    }
    

    return {   
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
                const toNodeId = opt.toId
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
            return getAllNodes().reverse()
        },

        getAllOptions: () => {
            return getAllOptions()
        },

        createStartNode: (character, text, processor, illustration) => {
            let startNode = new GraphNode(idCounter(), character, text, processor, illustration)
            nodes[startNode.id] = startNode
            nodesToOptions[startNode.id] = []
        },

        getListsRepresentation: () => {
            const options = getAllOptions()
            const nodes = getAllNodes()

            return { conversationParts: nodes, options: options }
        },

        logGraph: () => {
            console.log(nodes)
            console.log(nodesToOptions)
        }
    }
}());

// graph.buildGraph()