using DotNetEnv;
using FinanceManagement.Server.Models;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System.Data;
using System.Net.Http;
using System.Text.Json;
using FinanceManagement.Server.Entities;
using FinanceManagement.Server.IServices;

namespace FinanceManagement.Server.Controllers;

[ApiController]
[Route("[controller]")]
public class TransactionController : Controller
{
    private readonly ITransactionService _transactionService;
    private readonly ITransactionRecurringService _transactionRecurringService;

    public TransactionController(ITransactionService transactionService, ITransactionRecurringService transactionRecurringService)
    {
        _transactionService = transactionService;
        _transactionRecurringService = transactionRecurringService;

    }

    [HttpGet("List")]
    public async Task<IActionResult> GetAsync()
    {
        return Ok(await _transactionService.ListAllAsync());
    }

    [Route("ListTransactionRecurring")]
    [HttpGet]
    public async Task<IActionResult> GetAllTransaction()
    {
        return Ok(await _transactionRecurringService.ListAllAsync());
    }

    [Route("Get")]
    [HttpGet]
    public async Task<IActionResult> GetTransaction(int userId)
    {
        return Ok(await _transactionService.GetByUserIdAsync(userId));
    }

    [Route("GetRecurring")]
    [HttpPost]
    public async Task<IActionResult> GetTransactionRecurring(int id)
    {
        return Ok(await _transactionRecurringService.GetByUserIdAsync(id));
    }

    [HttpPost("AddBulk")]
    public async Task<IActionResult> BulkRequestTransaction(List<TransactionRequest> listTransaction)
    {
        if (await _transactionService.AddList(listTransaction))
        {
            return Created();
        }
        return BadRequest("Error while Adding Transaction!");
    }

    [HttpPost("AddRecurring")]
    public async Task<IActionResult> BulkRequestTransaction(List<TransactionRecurringRequest> listTransactionRecurring)
    {
        if (await _transactionRecurringService.AddList(listTransactionRecurring))
        {
            return Created();
        }
        return BadRequest("Error while Adding Transaction Recurring!");
    }

    [HttpDelete("Delete")]
    public async Task<IActionResult> Delete(int id)
    {
        if (await _transactionService.DeleteById(id))
        {
            return NoContent();
        }
        return BadRequest("Error while deleting transactions!");
    }

    [HttpDelete("BulkDelete")]
    public async Task<IActionResult> DeleteBulk(List<int> listTransaction)
    {
        if (await _transactionService.DeleteBulk(listTransaction))
        {
            return NoContent();
        }
        return BadRequest("Error while deleting transactions!");
    }


}

