<MyModal>
<form
  className="grid gap-2"
  onSubmit={async (e) => {
    e.preventDefault();

    if (
      !values.domain ||
      !values.type ||
      !values.ttl ||
      !values.value ||
      (values.type === "MX" && !values.priority) || // Check if priority is set for MX records
      (values.type === "SRV" &&
        (!values.weight || !values.port || !values.target)) || // Check if weight, port, and target are set for SRV records
      (values.type === "DS" &&
        (!values.keyTag ||
          !values.algorithm ||
          !values.digestType ||
          !values.digest)) // Check if keyTag, algorithm, digestType, and digest are set for DS records
    ) {
      toast.error("Values cannot be empty!");
      return;
    }

    createRecordMutation.mutate(values);
  }}
>

  <div className="grid gap-2">
    <Label htmlFor="domain">Domain Name</Label>
    <Input
      id="domain"
      placeholder="example.com"
      value={values.domain}
      onChange={handleChange("domain")}
    />
  </div>
  {/* dropdown context */}
  <div className="grid grid-cols-2 gap-4">
    <div className="grid gap-2">
      <Label htmlFor="record-type">Record Type</Label>
      <UncontrolledDropdown >
        <Button color="none">
          Select
        </Button>
        <DropdownToggle color="none" caret />
        {/* dropdown menu */}
        <DropdownMenu>
          <DropdownItem header>
            Record Tpe
          </DropdownItem>
          <DropdownItem onClick={handleSelectChange("type")}>
            A
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
  </div>
</form>

<Modal.Footer>
  <Button variant="primary" type="submit">
    Save Changes
  </Button>
</Modal.Footer>
</MyModal>

{/* <Button>Create Dialog</Button>

{/* // model 
<Modal toggle={toggle} isOpen={open}>
<ModalHeader toggle={toggle}>Create DNS Record</ModalHeader>

<ModalBody>
    form
</ModalBody>

<ModalFooter>
  <Button color="primary" onClick={toggle}>
    Create Record
  </Button>{' '}
  <Button color="secondary" onClick={toggle}>
    Cancel
  </Button>
</ModalFooter>
</Modal> */}