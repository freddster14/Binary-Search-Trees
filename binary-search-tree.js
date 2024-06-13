class Node{
    constructor(data, left = null, right = null){
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(root, array = []){
        this.root = root
        this.array = array
    }
    buildTree(array){
        if(array === undefined) return;
        if(this.array.length === 0){
            array.sort((a,b) => {
            return a - b
            })
            //Removes Dupes
            let b = 0
            for(let i = 1; i < array.length + 1; i++, b++){
                if(array[b] !== array[i]){
                    this.array.push((array[b]))
                }
            }
        }
        let start = 0
        let end = this.array.length - 1;
        let mid = Math.floor((start + end) / 2);
        this.root = this.balanceTree(start, end, mid)
        this.array = [];
        return this.root
    }
    balanceTree(start, end, mid){
        if(start > end) return null;
        return new Node(
            this.array[mid],
            this.balanceTree(start, mid - 1 , Math.floor((start + mid) / 2)),
            this.balanceTree(mid + 1, end , Math.floor(((mid + 1) + end) / 2))
            );
    }
    insert(value){
        if(this.root.data === value || value === undefined) return
        let tree = this.root
        let lastNode = null
        while(tree !== null && tree.data !== value){
            if(tree.data > value){
                lastNode = tree
                tree = tree.left
            }else if(tree.data < value){
                lastNode = tree
                tree = tree.right
            }
        }
        //Adds new 'Leaf'
        if(lastNode.data > value && tree === null){
            lastNode.left = new Node(value)
        }else if(lastNode.data < value && tree === null){
            lastNode.right = new Node(value)
        }
    }
    delete(value){
        if(value === undefined) return
        let tree = this.root;
        let lastNode = null;
        while(tree !== null && tree.data !== value){
            if(tree.data > value){
                lastNode = tree
                tree = tree.left
            }else if(tree.data < value){
                lastNode = tree
                tree = tree.right
            }
        }
        if(tree === null)return
        if(tree.left === null && tree.right === null){
            if(lastNode.data < tree.data) return lastNode.right = null
            return lastNode.left = null
        }else if(tree.left !== null && tree.right === null){
            if(lastNode.left === tree) return lastNode.left = tree.left;
            return lastNode.right = tree.left
        }else if(tree.right !== null && tree.left === null){
            if(lastNode.left === tree) return lastNode.left = tree.right;
            return lastNode.right = tree.right
        }else if(tree.left !== null && tree.right !== null){
            let successor = tree.right;
            lastNode = successor
            while(successor.left !== null){
                lastNode = successor
                successor = successor.left
            }
            if(lastNode.left === null) tree.right = null
            lastNode.left = successor.right
            tree.data = successor.data
        }
    }
    find(value){
        if(value === undefined) return
        let tree = this.root
        while(tree !== null && tree.data !== value){
            if(tree.data > value){
                tree = tree.left
            }else if(tree.data < value){
                tree = tree.right
            }
        }
        return tree
    }
    levelOrder(callback){
        let queue = [];
        this.array = [];
        queue.push(this.root)
        while(queue.length !== 0){
            if(queue[0].left !== null) queue.push(queue[0].left)
            if(queue[0].right !== null) queue.push(queue[0].right)
            if(callback !== undefined) callback(queue[0])
            this.array.push(queue.shift().data);
            }
            if(callback === undefined) return this.array
    }
    inOrder(callback, root = this.root, ){
        if(root === null) return;
        this.inOrder(callback, root.left);
        if(callback !== undefined) callback(callback, root)
        this.array.push(root.data)
        this.inOrder(callback, root.right)
        if(callback === undefined) return this.array

    }
    preOrder(callback, root = this.root){
        if(root === null) return;
        if(callback !== undefined) callback(root)
        this.array.push(root.data)
        this.preOrder(callback, root.left)
        this.preOrder(callback, root.right)
        if(callback === undefined) return this.array
                
    }
    postOrder(callback, root = this.root){
        if(root === null) return;
        this.postOrder(callback, root.left)
        this.postOrder(callback, root.right)
        this.array.push(root.data)
        if(callback !== undefined) callback(root)
        if(callback === undefined) return this.array
    }
    height(node){
        let array = [];
        let j = 0;
        this.heightLogic(node, 0, array);
        for(let i = 1; i < array.length; i++){
            if(array[j] < array[i]) {
                j = i
            }
        }
        return array[j]
    }
    heightLogic(node, count, arr){
        if(node === null) return count -= 1;
        if(node.left === null && node.right === null) {
            return count -= 1
        }
        count += 1;
        this.heightLogic(node.left, count, arr)
        this.heightLogic(node.right, count, arr)
        count += 1;
        arr.push(count)
        return arr
        
    }   
    depth(node){
        if(node === undefined || node === null) return;
        let tree = this.root;
        let count = 0;
        while(tree !== null && tree.data !== node.data){
            if(tree.data > node.data){
                tree = tree.left
            }else if(tree.data < node.data){
                tree = tree.right
            }
            count += 1
        }
        return `The Node: ${node.data} is at depth -> ${count}`
    }
    isBalanced(){
        if(this.height(this.root.left) - this.height(this.root.right) > 1){
            return false
        } else return true
    }
    rebalanced(){
        this.array = []
        if(!this.isBalanced()){
            this.buildTree(this.array = this.inOrder())
        }
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
  

function randomArray(number){
    let randomArray = [];
    let arrayLength = Math.floor(Math.random() * 30);
    if(arrayLength < 10) arrayLength += 5;
    for(let i = 0; i < arrayLength ; i++){
    randomArray.push(Math.floor(Math.random() * 99))
    }
    return randomArray
}
let randomTree = new Tree;
randomTree.buildTree(randomArray());
allTransversalMethods(randomTree)
console.log(`Is the tree balanced? => ${randomTree.isBalanced()}`)
console.log(prettyPrint(randomTree.root));
unBalanceATree(randomTree);
console.log(`Is the tree balanced? => ${randomTree.isBalanced()}`)
console.log(prettyPrint(randomTree.root));
randomTree.rebalanced();
console.log(`Is the tree balanced? => ${randomTree.isBalanced()}`)
console.log(prettyPrint(randomTree.root));
allTransversalMethods(randomTree);
//Find depth of a random element in the array
console.log(randomTree.depth(randomTree.find(randomTree.array[Math.floor(Math.random() * randomTree.array.length)])))

function unBalanceATree(tree){
    let balanced = tree.isBalanced()
    while(balanced){
        tree.insert(Math.floor(Math.random() * 10))
        balanced = tree.isBalanced()
    }
}

function allTransversalMethods(tree){
    console.log("Level Order " + tree.levelOrder());
    tree.array = []
    console.log("Pre Order " + tree.preOrder());
    tree.array = []
    console.log("In Order " + tree.inOrder());
    tree.array = []
    console.log("Post Order " + tree.postOrder());
}

