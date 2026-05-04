import ohm from "ohm-js"

const gram = ohm.grammar(String.raw`Final_Project {
  	Program = Statement+

  	logiOp = "!=" | "==" | "<=" | ">=" | "<" | ">" | logiAND | logiOR
  	logiAND = "&&" | "AND"
  	logiOR  = "||" | "OR"
    

  	exp     = logicExp

  	logicExp = compExp (spaces logiOp spaces compExp)*

	compExp  = addExp (spaces (" !=" | "==" | "<=" | ">=" | "<" | ">") spaces addExp)*

	addExp   = mulExp (spaces ("+" | "-") spaces mulExp)*

	mulExp   = term (spaces ("*" | "/") spaces term)*

  	term = num
     		| str
     		| bool
     		| ident
            | "(" spaces exp spaces ")" --special

	ident = letter (letter | digit | "_")*

  	num = digit+

  	str = "\"" (~"\"" any)* "\""

  	bool = "True" | "False"
    
    Block = "{" spaces Statement* spaces "}"

  	Statement = AssignStmt
          			   | PrintStmt
          			   | IfStmt
          			   | WhileStmt
                       | ForStmt
    
    AssignStmt = ident spaces "=" spaces exp ";"
    
    IfStmt = "if" spaces "(" spaces exp spaces ")" spaces Block
    			  ElsePart?
	ElsePart = spaces "else" spaces (IfStmt | Block)
	
    WhileStmt = "while" spaces "(" spaces exp spaces ")" spaces Block
                
	ForStmt = "for" spaces "(" spaces exp spaces ")" spaces Block
    
    PrintStmt = "print" spaces "(" spaces exp spaces ")" spaces Block
    				| "print" spaces "(" spaces exp spaces ")" spaces ";"
    
}`);

const mch = ohm.match(`x= 40
    print(x)`)