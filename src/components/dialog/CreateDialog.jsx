import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDNSRecord } from "../../apis";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { Record } from "../../types";
import {
  Input,
  Label,
  Button,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu
} from "reactstrap";
import Modal from "react-bootstrap/Modal";

import FormModal from "../Modal";

const CreateDialog = () => {
  
 
};

export default CreateDialog;
