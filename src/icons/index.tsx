import { FaCheck } from "react-icons/fa";
import { IconContext } from "react-icons";
import { IoIosArrowUp } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaCopy } from "react-icons/fa";

export const checkIcon = <IconContext.Provider value={{}}>
                            <FaCheck/>
                          </IconContext.Provider> 
export const arrowIcon = <IconContext.Provider value={{}}>
                        <IoIosArrowUp/>
                      </IconContext.Provider> 
export const arrowDownIcon = <IconContext.Provider value={{}}>
                                <IoMdArrowDropdown/>
                              </IconContext.Provider> 
export const copyIcon = <IconContext.Provider value={{}}>
                              <FaCopy/>
                            </IconContext.Provider> 