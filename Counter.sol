pragma solidity 0.5.17;

contract Counter {

    int private count = 0;
    event counterIncremented(int indexed cnt, uint _time);
    event counterDecremented(int indexed cnt, uint _time);

    function incrementCounter() public {
        count += 1;
        emit counterIncremented(count, now);
    }
    function decrementCounter() public {
        count -= 1;
        emit counterDecremented(count, now);
    }
    function getCount() public view returns (int) {
        return count;
    }

    function loop() public payable {
        msg.sender.transfer(msg.value);
    }

}
