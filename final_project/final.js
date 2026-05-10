import * as ohm from "ohm-js"
import fs from "fs"

const gram = ohm.grammar(String.raw`Final_Project {
  	Program = Statement+

  	logiOp = "!=" | "==" | "<=" | ">=" | "<" | ">" | logiAND | logiOR
  	logiAND = "&&" | "AND"
  	logiOR  = "||" | "OR"
    
    keyword =
    				  "if"			~identChar
					| "else"		~identChar
					| "while"		~identChar
					| "func"		~identChar
					| "return"		~identChar
					| "print"		~identChar
					| "True"		~identChar
					| "False"		~identChar
    
	identChar = letter | digit | "_"

  	exp     = logicExp

  	logicExp = compExp (spaces logiOp spaces compExp)*

	compExp  = addExp (spaces (" !=" | "==" | "<=" | ">=" | "<" | ">") spaces addExp)*

	addExp   = mulExp (spaces ("+" | "-") spaces mulExp)*

	mulExp   = primary (spaces ("*" | "/") spaces primary)*

	primary = call
    			  | term

    call = ident spaces "(" spaces argList? spaces ")"

  	term = num
     		| str
     		| bool
     		| ident
            | "(" spaces exp spaces ")" --special

	ident = letter (letter | digit | "_")*

  	num = digit+

  	str = "\"" (~"\"" any)* "\""

  	bool = "True" | "False"
    
    argList = exp (spaces "," spaces exp)*
    
    Block = "{" spaces Statement* spaces "}"

  	Statement = AssignStmt
    				   | FuncDecStmt
                       | ReturnStmt
                       | ExprStmt
          			   | PrintStmt
          			   | IfStmt
          			   | WhileStmt
                       | ForStmt
    
    
    ExprStmt = exp ";"
    
    FuncDecStmt = "func" spaces ident spaces "(" spaces ParamList? spaces ")" spaces Block
    
    ReturnStmt = "return" spaces exp ";"
  
  	ParamList = ident (spaces "," spaces ident)*
    
    AssignStmt = ident spaces "=" spaces exp ";"
    
    IfStmt = "if" spaces "(" spaces exp spaces ")" spaces Block
    			  ElsePart?
	ElsePart = spaces "else" spaces (IfStmt | Block)
	
    WhileStmt = "while" spaces "(" spaces exp spaces ")" spaces Block
                
	ForStmt = "for" spaces "(" spaces exp spaces ")" spaces Block
    
    PrintStmt = "print" spaces "(" spaces exp spaces ")" spaces Block
    				| "print" spaces "(" spaces exp spaces ")" spaces ";"
    
}`);

const mch = gram.match(fs.readFileSync(process.argv[2]));

if(mch.failed()){
	console.error(mch.message)
}else{
	console.log("Success!!")
}